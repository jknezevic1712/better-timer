import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

function TrackersTableActions() {
  return (
    <div className="flex w-full items-center justify-start gap-3">
      <i className="pi pi-play cursor-pointer text-primary lg:transition-opacity lg:hover:opacity-70"></i>
      {/* pi-play pi-pause */}
      <i className="pi pi-stop-circle cursor-pointer lg:transition-opacity lg:hover:opacity-70"></i>
      <i className="pi pi-pencil cursor-pointer lg:transition-opacity lg:hover:opacity-70"></i>
      <i className="pi pi-trash cursor-pointer lg:transition-opacity lg:hover:opacity-70"></i>
    </div>
  );
}

interface Trackers {
  timeLogged: string;
  description: string;
  dateCreated: string;
}
export default function TrackersTable() {
  const mockArr: Trackers[] = [
    {
      timeLogged: "01:30:33",
      dateCreated: "21/09/2023",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat recusandae veritatis illum et, quibusdam minus sint distinctio repellat libero iure ut temporibus eos unde facilis? Architecto aliquam perferendis distinctio ducimus magni fugit blanditiis sapiente libero numquam, ab nam, molestias voluptatibus beatae deleniti recusandae in eum. Ullam harum illum ratione exercitationem?",
    },
    {
      timeLogged: "01:30:33",
      dateCreated: "21/09/2023",
      description: "This is a description",
    },
    {
      timeLogged: "01:30:33",
      dateCreated: "21/09/2023",
      description: "This is a description",
    },
    {
      timeLogged: "01:30:33",
      dateCreated: "21/09/2023",
      description: "This is a description",
    },
    {
      timeLogged: "01:30:33",
      dateCreated: "21/09/2023",
      description: "This is a description",
    },
    {
      timeLogged: "01:30:33",
      dateCreated: "21/09/2023",
      description: "This is a description",
    },
    {
      timeLogged: "01:30:33",
      dateCreated: "21/09/2023",
      description: "This is a description",
    },
    {
      timeLogged: "01:30:33",
      dateCreated: "21/09/2023",
      description: "This is a description",
    },
    {
      timeLogged: "01:30:33",
      dateCreated: "21/09/2023",
      description: "This is a description",
    },
    {
      timeLogged: "01:30:33",
      dateCreated: "21/09/2023",
      description: "This is a description",
    },
    {
      timeLogged: "01:30:33",
      dateCreated: "21/09/2023",
      description: "This is a description",
    },
    {
      timeLogged: "01:30:33",
      dateCreated: "21/09/2023",
      description: "This is a description",
    },
  ];

  return (
    <div className="w-full">
      <DataTable
        value={mockArr}
        tableStyle={{ minWidth: "45rem" }}
        paginator
        rows={5}
      >
        <Column
          field="timeLogged"
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
          body={TrackersTableActions}
        ></Column>
      </DataTable>
    </div>
  );
}
