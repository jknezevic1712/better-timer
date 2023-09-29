import { useEffect } from "react";
// utils
import { formatDateToTimestamp } from "@/app/_utils/utils";
// components
import TrackersTable from "../../organisms/trackersTable/TrackersTable";
import TrackersActions from "../../molecules/trackersActions/TrackersActions";
import TrackersHeading from "../../atoms/trackersHeading/TrackersHeading";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/actions";
// types
import type { TrackerFromDB } from "@/app/_types/tracker";
import useStore from "@/app/_store/store";

export default function TrackersTemplate() {
  const { fetchTrackers } = useFirebaseActions();
  const setTrackers = useStore((state) => state.setTrackers);

  useEffect(() => {
    fetchTrackers().then((data) => {
      if (data) {
        const structuredData: TrackerFromDB[] = Object.entries(data).map(
          (res) => ({
            id: res[0],
            dateCreated: +res[1].dateCreated,
            description: res[1].description,
            startTime: res[1].startTime,
            endTime: res[1].endTime,
            loggedTime: formatDateToTimestamp(
              +res[1].endTime - +res[1].startTime,
            ),
            stopped: res[1].stopped,
          }),
        );

        setTrackers(structuredData);
      }
    });
  }, []);

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6 lg:max-w-3xl">
      <TrackersHeading />
      <TrackersActions />
      <TrackersTable />
    </div>
  );
}
