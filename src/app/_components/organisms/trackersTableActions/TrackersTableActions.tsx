import { useEffect, useState } from "react";
// components
import EditTrackerDialog from "../editTrackerDialog/EditTrackerDialog";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/actions";
import useToast from "@/app/_hooks/toast/Toast";
// types
import type { TrackerFromDB } from "@/app/_types/tracker";

export default function TrackersTableActions({
  trackers,
  trackerData,
  trackerTableType,
}: {
  trackers: TrackerFromDB[];
  trackerData: TrackerFromDB;
  trackerTableType: "active" | "history";
}) {
  const {
    startTracker,
    pauseTracker,
    stopTracker,
    deleteTracker,
    updateTrackerTime,
  } = useFirebaseActions();
  const toast = useToast();
  const [trackerInterval, setTrackerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [_, setIntervalTime] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  function startTimer() {
    setTrackerInterval(
      setInterval(
        () =>
          setIntervalTime((prevTotalSeconds) => {
            const newStateValue = prevTotalSeconds + 1;

            const secsToMs = newStateValue * 1000;
            const updatedTime = (+trackerData.endTime + secsToMs).toString();

            updateTrackerTime(trackerData.id, updatedTime);
            return newStateValue;
          }),
        1000,
      ),
    );

    startTracker(trackerData.id);
  }

  function stopTimer() {
    if (trackerInterval) {
      clearInterval(trackerInterval);
      setTrackerInterval(null);
      setIntervalTime(0);
      pauseTracker(trackerData.id);
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

      startTimer();
      return;
    }

    stopTimer();
    return;
  }

  function handleEditingTracker() {
    setShowDialog(true);
  }

  function ActiveTrackerTableActions() {
    return (
      <>
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
      </>
    );
  }

  useEffect(() => {
    return () => stopTimer();
  }, []);

  return (
    <>
      <div className="flex w-full items-center justify-start gap-3">
        {trackerTableType === "active" && <ActiveTrackerTableActions />}
        <i
          className="pi pi-pencil cursor-pointer lg:transition-opacity lg:hover:opacity-70"
          onClick={() => handleEditingTracker()}
        ></i>
        <i
          className="pi pi-trash cursor-pointer lg:transition-opacity lg:hover:opacity-70"
          onClick={() => deleteTracker(trackerData.id)}
        ></i>
      </div>
      {showDialog && (
        <EditTrackerDialog
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          trackerID={trackerData.id}
          trackerData={trackerData}
        />
      )}
    </>
  );
}
