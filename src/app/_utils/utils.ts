export function getNewDate(format?: "medium" | "full" | "long" | "short") {
  return new Date(Date.now()).toLocaleString(undefined, {
    dateStyle: format,
  });
}

export function formatDateToTimestamp(miliSecs: number) {
  const ms = miliSecs % 1000;
  miliSecs = (miliSecs - ms) / 1000;

  const secs = miliSecs % 60;
  miliSecs = (miliSecs - secs) / 60;

  const mins = miliSecs % 60;
  const hrs = (miliSecs - mins) / 60;

  const result = hrs + ":" + mins + ":" + secs;
  return result;
}
