import { useForm, Controller } from "react-hook-form";
// components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/actions";
// types
import type { Dispatch, SetStateAction } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { TrackerFromDB } from "@/app/_types/tracker";

type EditTrackerDialogProps = {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  trackerID: string;
  trackerData: TrackerFromDB;
};
type EditTrackerDialogForm = {
  startDate: Date;
  endDate: Date;
  description: string;
};
export default function EditTrackerDialog(props: EditTrackerDialogProps) {
  const { showDialog, setShowDialog, trackerID, trackerData } = props;
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<EditTrackerDialogForm>();
  const { editTracker } = useFirebaseActions();

  const onSubmit: SubmitHandler<EditTrackerDialogForm> = (data) => {
    const startTime = Date.parse(data.startDate.toString()).toString();
    const endTime = Date.parse(data.endDate.toString()).toString();
    const description = data.description.trim();

    if (description.length > 1) {
      editTracker(trackerID, {
        description,
        startTime,
        endTime,
      });
      setShowDialog(false);
      return;
    }
  };

  function EditTrackerDialogFooter() {
    return (
      <>
        <Button
          type="button"
          label="Cancel"
          icon="pi pi-times"
          outlined
          onClick={() => setShowDialog(false)}
        />
        <Button
          type="submit"
          form="editTrackerForm"
          label="Save"
          icon="pi pi-check"
        />
      </>
    );
  }

  function isEndDateLaterThanStartDate(endDate: Date) {
    const startMs = getValues("startDate")
      ? getValues("startDate")!.getTime()
      : +trackerData.startTime;
    const endMs = endDate ? endDate.getTime() : startMs + 1;

    return endMs > startMs;
  }

  return (
    <Dialog
      modal
      draggable={false}
      className="p-fluid w-full max-w-xs md:max-w-md"
      visible={showDialog}
      onHide={() => setShowDialog(false)}
      header="Edit Tracker"
      footer={EditTrackerDialogFooter}
    >
      <form id="editTrackerForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="startDate" className="font-bold">
            Start Date
          </label>
          <Controller
            name="startDate"
            control={control}
            defaultValue={new Date(+trackerData.startTime)}
            render={({ field }) => (
              <Calendar
                id="startDate"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                hourFormat="24"
                showTime
                showSeconds
                showIcon
              />
            )}
          />
        </div>
        <div className="field">
          <label htmlFor="endDate" className="font-bold">
            End Time
          </label>
          <Controller
            name="endDate"
            control={control}
            defaultValue={new Date(+trackerData.endTime)}
            rules={{
              validate: {
                laterThanStartTime: (v) =>
                  isEndDateLaterThanStartDate(v!) ||
                  "Please select a time that is later than the start time",
              },
              required: true,
            }}
            render={({ field }) => (
              <Calendar
                id="endDate"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                hourFormat="24"
                showTime
                showSeconds
                showIcon
              />
            )}
          />
          {errors.endDate?.message && (
            <small className="p-error">
              &#42;
              {errors.endDate.message}
            </small>
          )}
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <Controller
            name="description"
            control={control}
            defaultValue={trackerData.description}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <InputTextarea
                id="description"
                rows={3}
                cols={20}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </div>
      </form>
    </Dialog>
  );
}
