import { useEffect, useState } from "react";
import useStore from "@/app/_store/store";
// components
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import TrackersTableActions from "../trackersTableActions/TrackersTableActions";
// custom hooks
import { filterTrackers } from "@/app/_helpers/helpers";
// types
import type { TrackerFromDB } from "@/app/_types/tracker";

export default function ActiveTrackersTable() {
  const storeTrackers = useStore((state) => state.trackers);
  const [trackers, setTrackers] = useState<TrackerFromDB[]>([]);

  useEffect(() => {
    const filteredTrackers = filterTrackers(storeTrackers, "active");
    setTrackers(filteredTrackers);
  }, [storeTrackers]);

  return (
    <div className="w-full">
      <DataTable
        value={trackers}
        tableStyle={{ minWidth: "45rem" }}
        paginator
        rows={5}
        emptyMessage="No active trackers found."
      >
        <Column
          field="loggedTime"
          header="Time Logged"
          headerClassName="font-bold"
          headerStyle={{
            backgroundColor: "rgb(228 228 231)",
          }}
        ></Column>
        <Column
          field="description"
          header="Description"
          headerClassName="font-bold"
          headerStyle={{
            backgroundColor: "rgb(228 228 231)",
          }}
        ></Column>
        <Column
          header="Actions"
          headerClassName="font-bold"
          headerStyle={{
            backgroundColor: "rgb(228 228 231)",
          }}
          body={(data: TrackerFromDB) =>
            TrackersTableActions({
              trackers: trackers,
              trackerData: data,
              trackerTableType: "active",
            })
          }
        ></Column>
      </DataTable>
    </div>
  );
}
