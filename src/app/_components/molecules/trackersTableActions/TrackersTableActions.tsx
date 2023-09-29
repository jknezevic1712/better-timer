import type { TrackerFromDB } from "@/app/_types/tracker";

export default function TrackersTableActions({
  trackerData,
}: {
  trackerData: TrackerFromDB;
}) {
  return (
    <div className="flex w-full items-center justify-start gap-3">
      <i
        className={`pi pi-pause cursor-pointer text-primary lg:transition-opacity lg:hover:opacity-70 ${
          trackerData.stopped === true && "pi-play"
        }`}
      ></i>
      <i className="pi pi-stop-circle cursor-pointer lg:transition-opacity lg:hover:opacity-70"></i>
      <i className="pi pi-pencil cursor-pointer lg:transition-opacity lg:hover:opacity-70"></i>
      <i className="pi pi-trash cursor-pointer lg:transition-opacity lg:hover:opacity-70"></i>
    </div>
  );
}
