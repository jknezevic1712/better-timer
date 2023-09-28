// components
import { Button } from "primereact/button";

export default function TrackersActions() {
  return (
    <div className="flex w-full items-center justify-end gap-3">
      <Button
        label="Start new timer"
        className=""
        icon="pi pi-stopwatch"
        // onClick={() => startNewTimer()}
      />
      <Button
        label="Stop all"
        className="bg-accent"
        icon="pi pi-stop-circle"
        severity="secondary"
        // onClick={() => stopAllTimers()}
      />
    </div>
  );
}
