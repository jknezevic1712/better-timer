import { useState } from "react";
// components
import { Button } from "primereact/button";
import NewTrackerDialog from "../../organisms/newTrackerDialog/NewTrackerDialog";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/actions";

export default function ActiveTrackersActions() {
  const [showDialog, setShowDialog] = useState(false);
  const { stopAllTrackers } = useFirebaseActions();

  return (
    <>
      <div className="flex w-full items-center justify-end gap-3">
        <Button
          label="Start new timer"
          className=""
          icon="pi pi-stopwatch"
          onClick={() => setShowDialog(true)}
        />
        <Button
          label="Stop all"
          className="bg-accent"
          icon="pi pi-stop-circle"
          severity="secondary"
          onClick={() => stopAllTrackers()}
        />
      </div>
      {showDialog && (
        <NewTrackerDialog
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      )}
    </>
  );
}
