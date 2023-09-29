// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/actions";
// types
import type { TrackerFromDB } from "@/app/_types/tracker";

export default function TrackersTableActions({
  trackerData,
}: {
  trackerData: TrackerFromDB;
}) {
  const { startTracker, pauseTracker, stopTracker } = useFirebaseActions();

  function handlePlayPause() {
    if (trackerData.stopped === true) {
      startTracker(trackerData.id);
      return;
    }

    pauseTracker(trackerData.id);
    return;
  }

  return (
    <div className="flex w-full items-center justify-start gap-3">
      <i
        className={`pi pi-pause cursor-pointer text-primary lg:transition-opacity lg:hover:opacity-70 ${
          trackerData.stopped === true && "pi-play"
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
