import { useEffect, useState } from "react";
import useStore from "@/app/_store/store";
// components
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProgressSpinner } from "primereact/progressspinner";
import TrackersTableActions from "../../molecules/trackersTableActions/TrackersTableActions";
// types
import type { TrackerFromDB } from "@/app/_types/tracker";
// utils

export default function TrackersTable() {
  const storeTrackers = useStore((state) => state.trackers);
  const [trackers, setTrackers] = useState<TrackerFromDB[]>([]);

  useEffect(() => {
    setTrackers(storeTrackers);
  }, [storeTrackers]);

  if (trackers.length < 1) {
    return <ProgressSpinner />;
  }

  return (
    <div className="w-full">
      <DataTable
        value={trackers}
        tableStyle={{ minWidth: "45rem" }}
        paginator
        rows={5}
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
              trackerData: data,
            })
          }
        ></Column>
      </DataTable>
    </div>
  );
}
