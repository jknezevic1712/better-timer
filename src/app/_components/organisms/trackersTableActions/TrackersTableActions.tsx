import { useEffect, useState } from "react";
// components
import EditTrackerDialog from "../editTrackerDialog/EditTrackerDialog";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/useFirebaseActions";
import useToast from "@/app/_hooks/toast/useToast";
import useStore from "@/app/_hooks/store/store";
// types
import type { TrackerForApp } from "@/app/_types/tracker";

export default function TrackersTableActions({
  trackers,
  trackerData,
  trackerTableType,
  trackerRowIndex,
}: {
  trackers: TrackerForApp[];
  trackerData: TrackerForApp;
  trackerTableType: "active" | "history";
  trackerRowIndex: number;
}) {
  const { startTracker, pauseTracker, stopTracker, deleteTracker } =
    useFirebaseActions();
  const storeTrackers = useStore((state) => state.trackers);
  const updateTrackerTimeByID = useStore(
    (state) => state.updateTrackerTimeByID,
  );
  const toast = useToast();
  const [trackerInterval, setTrackerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [_, setIntervalTime] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  if (trackerData.description.includes("6")) {
    console.log("REEEEEEEEEEEEEEENDER ", trackerData);
  }

  function startTimer() {
    setTrackerInterval(
      setInterval(() => {
        console.log("storeTrackers ", storeTrackers);
        console.log(
          "storeTrackers ",
          storeTrackers[trackerRowIndex],
          ", trackerRowIndex",
          trackerRowIndex,
        );
        // const newStateValue = trackerInterval + 1;

        // const secsToMs = trackerData.endTime + 1000;
        const updatedTime = (+trackerData.endTime + 1000).toString();

        updateTrackerTimeByID(trackerData.id, updatedTime);
        // const newStateValue = trackerInterval + 1;

        // const secsToMs = newStateValue * 1000;
        // const updatedTime = (+trackerData.endTime + secsToMs).toString();

        // updateTracker(trackerData.id, updatedTime)

        // setIntervalTime((prevTotalSeconds) => {
        //   const newStateValue = prevTotalSeconds + 1;

        //   const secsToMs = newStateValue * 1000;
        //   const updatedTime = (+trackerData.endTime + secsToMs).toString();

        //   // TODO: this should be replaced with an update to store
        //   updateTracker(trackerData.id, updatedTime)
        //   // updateTrackerTime(trackerData.id, updatedTime);
        //   return newStateValue;
        // });
      }, 3000),
    );

    startTracker(trackerData.id);
  }

  function stopTimer(unmounting?: boolean) {
    if (trackerInterval && !unmounting) {
      clearInterval(trackerInterval);
      setTrackerInterval(null);
      // setIntervalTime(0);
      pauseTracker(trackerData.id);
    }

    if (unmounting && trackerData.running) {
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
    return () => stopTimer(true);
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
