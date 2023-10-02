// components
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
// types
import type { HistoryTemplateProps } from "../../templates/historyTemplate/HistoryTemplate";

export default function HistoryTrackersActions(
  props: Omit<HistoryTemplateProps, "trackers">,
) {
  const { filterData, setFilterData } = props;

  return (
    <div className="shadow-2 border-round flex w-full flex-col items-center gap-4 bg-zinc-200 p-4 lg:flex-row">
      <div className="w-full">
        <label htmlFor="start-date" className="mb-2 block font-semibold">
          Start Date
        </label>
        <Calendar
          id="start-date"
          showIcon
          dateFormat="dd.mm.yy"
          className="w-full"
          showButtonBar
          onClearButtonClick={() =>
            setFilterData((prev) => ({ ...prev, startTime: null }))
          }
          onSelect={(e) =>
            setFilterData({
              ...filterData,
              startTime: (e.value as Date).getTime().toString(),
            })
          }
        />
      </div>
      <div className="w-full">
        <label htmlFor="end-date" className="mb-2 block font-semibold">
          End Date
        </label>
        <Calendar
          id="end-date"
          showIcon
          dateFormat="dd.mm.yy"
          className="w-full"
          showButtonBar
          onClearButtonClick={() =>
            setFilterData((prev) => ({ ...prev, endTime: null }))
          }
          onSelect={(e) =>
            setFilterData({
              ...filterData,
              endTime: (e.value as Date).getTime().toString(),
            })
          }
        />
      </div>
      <div className="w-full">
        <label htmlFor="description" className="mb-2 block font-semibold">
          Description Contains
        </label>
        <div className="p-input-icon-right w-full">
          <i
            className="pi pi-times cursor-pointer"
            onClick={() =>
              setFilterData((prev) => ({ ...prev, description: "" }))
            }
          />
          <InputText
            id="description"
            className="w-full"
            value={filterData.description}
            onChange={(e) =>
              setFilterData({
                ...filterData,
                description: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
