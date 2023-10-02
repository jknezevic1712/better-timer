// components
import TrackersTableHeading from "../../atoms/trackersTableHeading/TrackersTableHeading";
import HistoryTrackersActions from "../../molecules/historyTrackersActions/HistoryTrackersActions";
import HistoryTrackersTable from "../../organisms/historyTrackersTable/HistoryTrackersTable";
// types
import type { TrackerFromDB } from "@/app/_types/tracker";
import type { FilterData } from "@/app/(routes)/history/page";
import type { Dispatch, SetStateAction } from "react";

export type HistoryTemplateProps = {
  filterData: FilterData;
  setFilterData: Dispatch<SetStateAction<FilterData>>;
  trackers: TrackerFromDB[];
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
