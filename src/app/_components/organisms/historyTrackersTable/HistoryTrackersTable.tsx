// components
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import TrackersTableActions from "../trackersTableActions/TrackersTableActions";
// types
import type { TrackerFromDB } from "@/app/_types/tracker";

export default function HistoryTrackersTable({
  trackers,
}: {
  trackers: TrackerFromDB[];
}) {
  return (
    <div className="w-full">
      <DataTable
        value={trackers}
        tableStyle={{ minWidth: "45rem" }}
        paginator
        rows={5}
        emptyMessage="No inactive trackers found."
      >
        <Column
          field="dateCreatedFormatted"
          header="Date"
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
          field="loggedTime"
          header="Time tracked"
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
              trackerTableType: "history",
            })
          }
        ></Column>
      </DataTable>
    </div>
  );
}
