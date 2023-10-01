import { usePathname, useSearchParams, useRouter } from "next/navigation";
// components
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";

export default function HistoryTrackersActions() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  function setUrlParams(
    name: "startTime" | "endTime" | "description",
    value: string,
  ) {
    const trimmedName = name.trim();
    const trimmedValue = value.trim();

    if (trimmedName.length > 1) {
      current.set(trimmedName, trimmedValue);
    }

    const query = current.toString();
    router.push(`${pathname}/?${query}`);
  }

  function clearUrlParams() {
    console.log("CLEARING ");

    current.get("description");
    current.delete("description");
  }

  return (
    <div className="shadow-2 border-round flex w-full flex-col items-center gap-4 bg-zinc-200 p-4 lg:flex-row">
      <div className="w-full">
        <Calendar
          showIcon
          dateFormat="dd.mm.yy"
          className="w-full"
          onChange={(e) =>
            setUrlParams(
              "startTime",
              (e.target.value as Date).getTime().toString(),
            )
          }
        />
      </div>
      <div className="w-full">
        <Calendar
          showIcon
          dateFormat="dd.mm.yy"
          className="w-full"
          onChange={(e) =>
            setUrlParams(
              "endTime",
              (e.target.value as Date).getTime().toString(),
            )
          }
        />
      </div>
      <div className="p-input-icon-right w-full">
        <i
          className="pi pi-times cursor-pointer bg-pink-500"
          onClick={() => clearUrlParams()}
        />
        <InputText
          className="w-full"
          onChange={(e) => setUrlParams("description", e.target.value)}
        />
      </div>
    </div>
  );
}
