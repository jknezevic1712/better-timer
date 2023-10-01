// utils
import { getTodaysDate } from "@/app/_utils/utils";

export default function TrackersTableHeading({
  headingType,
}: {
  headingType: "active" | "history";
}) {
  function HeadingText() {
    if (headingType === "active")
      return (
        <>
          <i className="pi pi-calendar text-xl"></i> Today ({getTodaysDate()})
        </>
      );

    return "Trackers History";
  }

  return (
    <h1 className="w-full text-left text-2xl font-semibold">
      <HeadingText />
    </h1>
  );
}
