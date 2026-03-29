export function formatDate(value) {
  if (!value) return "Draft";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Draft";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

export function toSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
