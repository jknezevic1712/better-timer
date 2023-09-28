export default function TrackersHeading({
  todaysDate,
}: {
  todaysDate: string;
}) {
  return (
    <h1 className="w-full text-left text-2xl font-semibold">
      <i className="pi pi-calendar text-xl"></i> Today ({todaysDate})
    </h1>
  );
}
