/**
 * returns /img/features/1-home.jpg 1x, /img/features/1-home@2x.jpg 2x, /img/features/1-home@3x.jpg 3x
 *
 * @param {string} srcset 1x,2x,3x
 * @param {string} src /img/features/1-home.jpg
 * @param {string} newExtension webp
 */
export default function getSrcSet(
  srcset?: string,
  src?: string,
  newExtension?: string,
) {
  if (!srcset || !src) {
    return "";
  }
  const resolutions = srcset.split(",");
  const srcsetOptions = [];
  const filename = getFileName(src);
  const extension = newExtension || getExtension(src);
  for (const resolution of resolutions) {
    if (resolution === "1x") {
      srcsetOptions.push(`${filename}.${extension} ${resolution}`);
      continue;
    }
    srcsetOptions.push(`${filename}@${resolution}.${extension} ${resolution}`);
  }
  return srcsetOptions.join(",");
}

function getExtension(filename?: string) {
  if (!filename || typeof filename !== "string") {
    return ""; // bad argument
  }
  if (!filename.includes(".")) {
    return ""; // no dot
  }
  return filename.split(".").pop();
}

function getFileName(filename: string) {
  return filename.split(".").slice(0, -1).join(".");
}
