import { useState } from "react";
// components
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/actions";

export default function HistoryTrackersActions() {
  return (
    <div className="shadow-2 border-round flex w-full flex-col items-center gap-4 bg-zinc-200 p-4 lg:flex-row">
      <div className="w-full">
        <Calendar
          showIcon
          dateFormat="dd.mm.yy"
          className="w-full"
          // onChange={(e) => console.log("E ", typeof e.target.value)} // Object
        />
      </div>
      <div className="w-full">
        <Calendar showIcon dateFormat="dd.mm.yy" className="w-full" />
      </div>
      <div className="p-input-icon-right w-full">
        <i className="pi pi-times" />
        <InputText className="w-full" />
      </div>
    </div>
  );
}
