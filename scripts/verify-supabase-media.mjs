import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const sourceRoots = ["app", "components", "lib"];
const publicRoot = path.join(projectRoot, "public");
const baseUrl =
  "https://msukvnceueoxgklxennx.supabase.co/storage/v1/object/public/media";

function encodePathSegment(segment) {
  try {
    return encodeURIComponent(decodeURIComponent(segment));
  } catch {
    return encodeURIComponent(segment);
  }
}

function normalizeMediaPath(mediaPath) {
  return mediaPath
    .replace(/^\/+/, "")
    .split("/")
    .filter(Boolean)
    .map(encodePathSegment)
    .join("/");
}

function mediaUrl(mediaPath) {
  return `${baseUrl}/${normalizeMediaPath(mediaPath)}`;
}

function readSourceFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") return [];
      return readSourceFiles(fullPath);
    }

    if (!/\.(tsx?|jsx?)$/.test(entry.name)) return [];
    return [fullPath];
  });
}

function collectMediaReferences() {
  const references = new Set();
  const files = sourceRoots
    .flatMap((root) => readSourceFiles(path.join(projectRoot, root)))
    .filter((file) => path.relative(projectRoot, file) !== path.join("lib", "media.ts"));
  const patterns = [
    {
      regex: /manishImage\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
      map: ([filename]) => `images/Manish Images/${filename}`,
    },
    {
      regex: /selectedWorkImage\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
      map: ([filename]) => `images/Manish Images/Our selected work/${filename}`,
    },
    {
      regex: /serviceImage\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
      map: ([filename]) => `images/Manish Images/Services/${filename}`,
    },
    {
      regex: /imageUrl\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
      map: ([mediaPath]) => `images/${mediaPath}`,
    },
    {
      regex: /videoUrl\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
      map: ([mediaPath]) => `videos/${mediaPath}`,
    },
    {
      regex: /mediaUrl\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
      map: ([mediaPath]) => mediaPath,
    },
    {
      regex:
        /videoFile\(\s*["'`]([^"'`]+)["'`]\s*,\s*["'`]([^"'`]+)["'`]\s*\)/g,
      map: ([folder, filename]) => `videos/${folder}/${filename}`,
    },
  ];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.regex.exec(content)) !== null) {
        references.add(pattern.map(match.slice(1)));
      }
    }
  }

  return [...references].sort((a, b) => a.localeCompare(b));
}

async function checkUrl(reference) {
  const url = mediaUrl(reference);
  const response = await fetch(url, { method: "HEAD" });

  return {
    reference,
    url,
    status: response.status,
    ok: response.ok,
  };
}

const references = collectMediaReferences();
const missingLocal = references.filter(
  (reference) => !fs.existsSync(path.join(publicRoot, reference)),
);

const remoteResults = [];
for (const reference of references) {
  try {
    remoteResults.push(await checkUrl(reference));
  } catch (error) {
    remoteResults.push({
      reference,
      url: mediaUrl(reference),
      status: "network-error",
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

const missingRemote = remoteResults.filter((result) => !result.ok);

console.log(`Base URL: ${baseUrl}`);
console.log(`Media references in app: ${references.length}`);
console.log(`Local file mismatches: ${missingLocal.length}`);
console.log(`Supabase URL mismatches: ${missingRemote.length}`);

if (missingLocal.length > 0) {
  console.log("\nMissing local files:");
  for (const reference of missingLocal) {
    console.log(`- ${reference}`);
  }
}

if (missingRemote.length > 0) {
  console.log("\nMissing or inaccessible Supabase objects:");
  for (const result of missingRemote) {
    console.log(`- ${result.status} ${result.reference}`);
    console.log(`  ${result.url}`);
  }
}

if (missingLocal.length > 0 || missingRemote.length > 0) {
  process.exitCode = 1;
}
