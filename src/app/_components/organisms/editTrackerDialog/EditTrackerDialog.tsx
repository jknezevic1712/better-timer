import { useForm, type SubmitHandler } from "react-hook-form";
// components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/actions";
// types
import type { Dispatch, SetStateAction } from "react";
import type { TrackerFromDB } from "@/app/_types/tracker";

type EditTrackerDialogProps = {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  trackerID: string;
  trackerData: TrackerFromDB;
};
type EditTrackerDialogForm = {
  startDate?: Date;
  endDate?: Date;
  description?: string;
};
export default function EditTrackerDialog(props: EditTrackerDialogProps) {
  const { showDialog, setShowDialog, trackerID, trackerData } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<EditTrackerDialogForm>({});
  const { editTracker } = useFirebaseActions();

  const onSubmit: SubmitHandler<EditTrackerDialogForm> = (data) => {
    const startTime = data.startDate
      ? Date.parse(data.startDate.toString()).toString()
      : trackerData.startTime;
    const endTime = data.endDate
      ? Date.parse(data.endDate.toString()).toString()
      : trackerData.endTime;
    const description = data.description
      ? data.description.trim()
      : trackerData.description;

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
      ? getValues("startDate")?.getTime()!
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
          <Calendar
            id="startDate"
            {...register("startDate")}
            hourFormat="24"
            showTime
            showSeconds
            showIcon
          />
        </div>
        <div className="field">
          <label htmlFor="endTime" className="font-bold">
            End Time
          </label>
          <Calendar
            id="endTime"
            {...register("endDate", {
              validate: {
                laterThanStartTime: (v) =>
                  isEndDateLaterThanStartDate(v!) ||
                  "Please select a time that is later than the start time",
              },
            })}
            hourFormat="24"
            showTime
            showSeconds
            showIcon
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
          <InputTextarea
            id="description"
            rows={3}
            cols={20}
            {...register("description")}
          />
        </div>
      </form>
    </Dialog>
  );
}
