import { useEffect, useState } from "react";
// utils
import { getDate } from "@/app/_utils/utils";
// components
import TrackersTable from "../../organisms/trackersTable/TrackersTable";
import TrackersActions from "../../molecules/trackersActions/TrackersActions";
import TrackersHeading from "../../atoms/trackersHeading/TrackersHeading";

export default function TrackersTemplate() {
  const [todaysDate, setTodaysDate] = useState("");

  useEffect(() => {
    setTodaysDate(() => getDate("medium"));
  }, []);

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6 lg:max-w-3xl">
      <TrackersHeading todaysDate={todaysDate} />
      <TrackersActions />
      <TrackersTable />
    </div>
  );
}
