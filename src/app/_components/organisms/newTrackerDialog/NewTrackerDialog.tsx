import { useForm, type SubmitHandler } from "react-hook-form";
// components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/actions";
// types
import type { Dispatch, SetStateAction } from "react";

type NewTrackerDialogProps = {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
};
type NewTrackerDialogForm = { description: string };

export default function NewTrackerDialog(props: NewTrackerDialogProps) {
  const { showDialog, setShowDialog } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTrackerDialogForm>();
  const { addNewTracker } = useFirebaseActions();

  const onSubmit: SubmitHandler<NewTrackerDialogForm> = (data) => {
    const description = data.description.trim();

    if (description.length > 1) {
      addNewTracker(description);
      setShowDialog(false);
      return;
    }
  };

  function NewTrackerDialogFooter() {
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
          form="newTrackerForm"
          label="Save"
          icon="pi pi-check"
        />
      </>
    );
  }

  return (
    <Dialog
      modal
      draggable={false}
      className="p-fluid w-full max-w-xs md:max-w-md"
      visible={showDialog}
      onHide={() => setShowDialog(false)}
      header="New Tracker Information"
      footer={NewTrackerDialogFooter}
    >
      <form id="newTrackerForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <InputTextarea
            id="description"
            rows={3}
            cols={20}
            {...register("description", { required: true })}
          />
          {errors.description && (
            <small className="p-error">&#42;Please fill out this field.</small>
          )}
        </div>
      </form>
    </Dialog>
  );
}
