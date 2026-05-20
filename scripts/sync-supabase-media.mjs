import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, "public");
const envPath = path.join(projectRoot, ".env.local");
const bucketName = "media";
const sourceRoots = ["app", "components", "lib"];

function loadEnv() {
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

function contentTypeFor(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".png") return "image/png";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".webp") return "image/webp";
  if (extension === ".gif") return "image/gif";
  if (extension === ".mp4") return "video/mp4";
  if (extension === ".mov") return "video/quicktime";
  return "application/octet-stream";
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

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

const { data: buckets, error: bucketListError } = await supabase.storage.listBuckets();

if (bucketListError) {
  console.error(`Could not list buckets: ${bucketListError.message}`);
  process.exit(1);
}

if (!buckets.some((bucket) => bucket.name === bucketName)) {
  const { error: createError } = await supabase.storage.createBucket(bucketName, {
    public: true,
  });

  if (createError) {
    console.error(`Could not create ${bucketName} bucket: ${createError.message}`);
    process.exit(1);
  }

  console.log(`Created public bucket: ${bucketName}`);
}

const references = collectMediaReferences();
const missingLocal = references.filter(
  (reference) => !fs.existsSync(path.join(publicRoot, reference)),
);

if (missingLocal.length > 0) {
  console.error("Cannot upload because these local files are missing:");
  for (const reference of missingLocal) console.error(`- ${reference}`);
  process.exit(1);
}

let uploaded = 0;
let failed = 0;

for (const reference of references) {
  const filePath = path.join(publicRoot, reference);
  const file = fs.readFileSync(filePath);
  const { error } = await supabase.storage.from(bucketName).upload(reference, file, {
    cacheControl: "31536000",
    contentType: contentTypeFor(filePath),
    upsert: true,
  });

  if (error) {
    failed += 1;
    console.error(`Failed: ${reference}`);
    console.error(`  ${error.message}`);
  } else {
    uploaded += 1;
    console.log(`Uploaded: ${reference}`);
  }
}

console.log(`\nUploaded/updated: ${uploaded}`);
console.log(`Failed: ${failed}`);

if (failed > 0) process.exitCode = 1;
