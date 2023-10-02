import { useCallback, useState } from "react";
// custom hooks
import useFirebaseActions from "../firebase/useFirebaseActions";
// types
import type { TrackerFromDB } from "@/app/_types/tracker";

export default function useTrackerActions() {
  // console.log("RE RENDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEER");
  const { startTracker, pauseTracker, updateTrackerTime } =
    useFirebaseActions();
  const [trackerInterval, setTrackerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [_, setIntervalTime] = useState(0);

  const startTimer = useCallback(
    (trackerData: Pick<TrackerFromDB, "id" | "endTime">) => {
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
    },
    [],
  );

  const pauseTimer = useCallback((trackerData?: Pick<TrackerFromDB, "id">) => {
    // console.log("PAUSE TIMER HOOK ", trackerInterval);
    if (trackerInterval) {
      console.log("PAUSE TIMER HOOK INSIDE");
      clearInterval(trackerInterval);
      setTrackerInterval(null);
      setIntervalTime(0);
      // pauseTracker(trackerData.id);
    }
  }, []);

  // useEffect(() => {
  //   return () => {
  //     // console.log("PAUSIIIIIIIING");
  //     pauseTimer();
  //   };
  // }, []);

  return { startTimer, pauseTimer };
}
