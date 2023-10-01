// components
import TrackersTableHeading from "../../atoms/trackersTableHeading/TrackersTableHeading";
import HistoryTrackersActions from "../../molecules/historyTrackersActions/HistoryTrackersActions";
import HistoryTrackersTable from "../../organisms/historyTrackersTable/HistoryTrackersTable";

export default function HistoryTemplate() {
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6 lg:max-w-3xl">
      <TrackersTableHeading headingType="history" />
      <HistoryTrackersActions />
      <HistoryTrackersTable />
    </div>
  );
}
