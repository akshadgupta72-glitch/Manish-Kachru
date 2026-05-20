export const SUPABASE_MEDIA_BASE_URL =
  "https://msukvnceueoxgklxennx.supabase.co/storage/v1/object/public/media";

function encodePathSegment(segment: string) {
  try {
    return encodeURIComponent(decodeURIComponent(segment));
  } catch {
    return encodeURIComponent(segment);
  }
}

function normalizeMediaPath(path: string) {
  return path
    .replace(/^\/+/, "")
    .split("/")
    .filter(Boolean)
    .map(encodePathSegment)
    .join("/");
}

export function mediaUrl(path: string) {
  return `${SUPABASE_MEDIA_BASE_URL}/${normalizeMediaPath(path)}`;
}

export function imageUrl(path: string) {
  return mediaUrl(`images/${path}`);
}

export function videoUrl(path: string) {
  return mediaUrl(`videos/${path}`);
}

export function manishImage(filename: string) {
  return imageUrl(`Manish Images/${filename}`);
}

export function selectedWorkImage(filename: string) {
  return imageUrl(`Manish Images/Our selected work/${filename}`);
}

export function serviceImage(filename: string) {
  return imageUrl(`Manish Images/Services/${filename}`);
}

export function videoFile(folder: string, filename: string) {
  return videoUrl(`${folder}/${filename}`);
}

