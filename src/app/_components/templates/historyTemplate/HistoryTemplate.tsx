import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// components
import TrackersTableHeading from "../../atoms/trackersTableHeading/TrackersTableHeading";
import HistoryTrackersActions from "../../molecules/historyTrackersActions/HistoryTrackersActions";
import HistoryTrackersTable from "../../organisms/historyTrackersTable/HistoryTrackersTable";
// custom hooks
import useStore from "@/app/_store/store";
// utils
import { filterTrackers } from "@/app/_utils/utils";
// types
import type { TrackerFromDB } from "@/app/_types/tracker";

export type FilterData = {
  startTime: string | null;
  endTime: string | null;
  description: string | null;
};
export default function HistoryTemplate() {
  const storeTrackers = useStore((state) => state.trackers);
  const searchParams = useSearchParams();
  const [trackers, setTrackers] = useState<TrackerFromDB[]>([]);

  function searchFilter() {
    const startTimeFilter = searchParams.get("startTime") ?? "";
    const endTimeFilter = searchParams.get("endTime") ?? "9999999999999";
    const descriptionFilter = searchParams.get("description") ?? "";

    const filteredTrackers = filterTrackers(storeTrackers, "history");

    return filteredTrackers.filter(
      (tracker) =>
        tracker.description.includes(descriptionFilter) &&
        +tracker.startTime > +startTimeFilter &&
        +tracker.endTime < +endTimeFilter,
    );
  }

  useEffect(() => {
    setTrackers(searchFilter());
  }, [storeTrackers, searchParams]);

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6 lg:max-w-3xl">
      <TrackersTableHeading headingType="history" />
      <HistoryTrackersActions />
      <HistoryTrackersTable trackers={trackers} />
    </div>
  );
}
