// components
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";

export default function TrackersTemplate() {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <h1 className="w-full text-left text-2xl font-semibold">
        Trackers History
      </h1>

      <div className="shadow-2 border-round flex w-full flex-col items-center gap-4 bg-zinc-100 p-4 lg:w-6">
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

      <div></div>
    </div>
  );
}
