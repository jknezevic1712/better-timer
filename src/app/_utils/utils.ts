// types
import type { TrackerFromDB } from "../_types/tracker";

export function getTodaysDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day}.${month}.${year}.`;

  return formattedDate;
}

export function formatDateToTimestamp(milliseconds: number) {
  const hours = Math.floor(milliseconds / 3600000);
  milliseconds %= 3600000;
  const minutes = Math.floor(milliseconds / 60000);
  milliseconds %= 60000;
  const seconds = Math.floor(milliseconds / 1000);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return formattedTime;
}

export function filterTrackers(
  trackers: TrackerFromDB[],
  trackerType: "active" | "history",
) {
  if (trackerType === "active")
    return trackers.filter((val) => val.active === true);

  return trackers.filter((val) => val.active === false);
}
