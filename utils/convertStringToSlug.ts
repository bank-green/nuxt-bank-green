export default function convertToSlug(string) {
  if (!string || typeof string !== "string") {
    return string;
  }
  return string
    .replace(/[`~!@#$%^&*()_\-+=[\]{};:'"\\|/,.<>?\s]/g, " ")
    .toLowerCase()
    .replace(/^\s+|\s+$/gm, "")
    .replace(/\s+/g, "-");
}
