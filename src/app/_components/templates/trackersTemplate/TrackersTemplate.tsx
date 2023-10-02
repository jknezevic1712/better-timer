// components
import TrackersTableHeading from "../../atoms/trackersTableHeading/TrackersTableHeading";
import ActiveTrackersActions from "../../molecules/activeTrackersActions/ActiveTrackersActions";
import ActiveTrackersTable from "../../organisms/activeTrackersTable/ActiveTrackersTable";

export default function TrackersTemplate() {
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6 lg:max-w-3xl">
      <TrackersTableHeading headingType="active" />
      <ActiveTrackersActions />
      <ActiveTrackersTable />
    </div>
  );
}
