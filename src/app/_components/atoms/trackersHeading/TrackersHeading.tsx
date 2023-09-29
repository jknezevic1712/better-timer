// utils
import { getNewDate } from "@/app/_utils/utils";

export default function TrackersHeading() {
  return (
    <h1 className="w-full text-left text-2xl font-semibold">
      <i className="pi pi-calendar text-xl"></i> Today ({getNewDate("medium")})
    </h1>
  );
}
