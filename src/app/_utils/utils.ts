export function getDate(format?: "medium" | "full" | "long" | "short") {
  return new Date(Date.now()).toLocaleString(undefined, {
    dateStyle: format,
  });
}
