export function formatDate(createdAt) {
  return new Date(createdAt).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
