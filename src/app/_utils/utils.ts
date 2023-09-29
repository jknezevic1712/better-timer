export function getNewDate(format?: "medium" | "full" | "long" | "short") {
  return new Date(Date.now()).toLocaleString(undefined, {
    dateStyle: format,
  });
}

export function formatDateToTimestamp(date: string) {
  return new Date(date).toTimeString().substring(0, 8);
}
