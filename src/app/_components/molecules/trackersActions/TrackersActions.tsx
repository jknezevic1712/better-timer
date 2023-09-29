import { useState } from "react";
// components
import { Button } from "primereact/button";
import NewTrackerDialog from "../../organisms/newTrackerDialog/NewTrackerDialog";

export default function TrackersActions() {
  const [showDialog, setShowDialog] = useState(false);

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
          // onClick={() => stopAllTimers()}
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
