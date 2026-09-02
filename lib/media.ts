function normalizePublicPath(path: string) {
  return `/${path.replace(/^\/+/, "")}`;
}

export function mediaUrl(path: string) {
  return normalizePublicPath(path);
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
