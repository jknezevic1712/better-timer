import { useEffect, useState } from "react";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/actions";
import useToast from "@/app/_hooks/toast/Toast";
// types
import type { TrackerFromDB } from "@/app/_types/tracker";

export default function TrackersTableActions({
  trackers,
  trackerData,
}: {
  trackers: TrackerFromDB[];
  trackerData: TrackerFromDB;
}) {
  const { startTracker, pauseTracker, stopTracker, updateTrackerTime } =
    useFirebaseActions();
  const toast = useToast();
  const [trackerInterval, setTrackerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [_, setIntervalTime] = useState(0);

  function startTracking() {
    setTrackerInterval(
      setInterval(
        () =>
          setIntervalTime((prevTotalSeconds) => {
            const newStateValue = prevTotalSeconds + 1;
            const updatedTime = +trackerData.endTime + newStateValue;

            updateTrackerTime(trackerData.id, updatedTime.toString());
            return newStateValue;
          }),
        1000,
      ),
    );
  }

  function stopTracking() {
    if (trackerInterval) {
      clearInterval(trackerInterval);
      setTrackerInterval(null);
      setIntervalTime(0);
    }
  }

  function handlePlayPause() {
    const isAnyTrackerRunning = trackers.find((val) => val.running === true);

    if (trackerData.running === false) {
      if (isAnyTrackerRunning) {
        return toast(
          `Error starting a tricker, reason: there is another tracker already running!`,
          "error",
        );
      }

      startTracking();
      startTracker(trackerData.id);
      return;
    }

    stopTracking();
    pauseTracker(trackerData.id);
    return;
  }

  useEffect(() => {
    return () => stopTracking();
  }, []);

  return (
    <div className="flex w-full items-center justify-start gap-3">
      <i
        className={`pi pi-pause cursor-pointer text-primary lg:transition-opacity lg:hover:opacity-70 ${
          trackerData.running === false && "pi-play"
        }`}
        onClick={() => handlePlayPause()}
      ></i>
      <i
        className="pi pi-stop-circle cursor-pointer lg:transition-opacity lg:hover:opacity-70"
        onClick={() => stopTracker(trackerData.id)}
      ></i>
      <i className="pi pi-pencil cursor-pointer lg:transition-opacity lg:hover:opacity-70"></i>
      <i className="pi pi-trash cursor-pointer lg:transition-opacity lg:hover:opacity-70"></i>
    </div>
  );
}
