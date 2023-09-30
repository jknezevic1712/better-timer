export function getTodaysDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day}.${month}.${year}.`;

  return formattedDate;
}

export function formatDateToTimestamp(miliSecs: number, formatMs?: boolean) {
  if (formatMs) {
    const ms = miliSecs % 1000;
    miliSecs = (miliSecs - ms) / 1000;
  }

  const seconds = (miliSecs % 60).toString().padStart(2, "0");
  const minutes = Math.floor((miliSecs % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor(miliSecs / 3600)
    .toString()
    .padStart(2, "0");

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
}
