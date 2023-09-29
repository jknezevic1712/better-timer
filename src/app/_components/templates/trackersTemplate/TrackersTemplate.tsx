import { useEffect } from "react";
// components
import TrackersTable from "../../organisms/trackersTable/TrackersTable";
import TrackersActions from "../../molecules/trackersActions/TrackersActions";
import TrackersHeading from "../../atoms/trackersHeading/TrackersHeading";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/actions";

export default function TrackersTemplate() {
  const { unsubscribeFetchTrackers, fetchTrackers } = useFirebaseActions();

  useEffect(() => {
    fetchTrackers();

    return () => {
      unsubscribeFetchTrackers && unsubscribeFetchTrackers();
    };
  }, []);

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6 lg:max-w-3xl">
      <TrackersHeading />
      <TrackersActions />
      <TrackersTable />
    </div>
  );
}
