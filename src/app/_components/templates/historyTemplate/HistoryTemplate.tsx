// components
import TrackersTableHeading from "../../atoms/trackersTableHeading/TrackersTableHeading";
import HistoryTrackersActions from "../../molecules/historyTrackersActions/HistoryTrackersActions";
import HistoryTrackersTable from "../../organisms/historyTrackersTable/HistoryTrackersTable";
// types
import type { TrackerForApp } from "@/app/_types/tracker";
import type { Dispatch, SetStateAction } from "react";

export type FilterData = {
  startTime: string | null;
  endTime: string | null;
  description: string;
};
export const filterInitialData: FilterData = {
  startTime: null,
  endTime: null,
  description: "",
};
export type HistoryTemplateProps = {
  filterData: FilterData;
  setFilterData: Dispatch<SetStateAction<FilterData>>;
  trackers: TrackerForApp[];
};
export default function HistoryTemplate(props: HistoryTemplateProps) {
  const { filterData, setFilterData, trackers } = props;

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6 lg:max-w-3xl">
      <TrackersTableHeading headingType="history" />
      <HistoryTrackersActions
        filterData={filterData}
        setFilterData={setFilterData}
      />
      <HistoryTrackersTable trackers={trackers} />
    </div>
  );
}
