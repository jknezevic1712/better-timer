"use client";

import { useState, useEffect } from "react";
// components
import HistoryTemplate from "@/app/_components/templates/historyTemplate/HistoryTemplate";
// custom hooks
import useStore from "@/app/_store/store";
// types
import type { TrackerFromDB } from "@/app/_types/tracker";
// utils
import { filterTrackers } from "@/app/_utils/utils";

export type FilterData = {
  startTime: string | null;
  endTime: string | null;
  description: string;
};
export const filterInitialData: FilterData = {
  startTime: null,
  endTime: null,
  description: "",
};
export default function History() {
  const storeTrackers = useStore((state) => state.trackers);
  const [trackers, setTrackers] = useState<TrackerFromDB[]>([]);
  const [filterData, setFilterData] = useState<FilterData>(filterInitialData);

  function applySearchFilters(trackers: TrackerFromDB[]) {
    return trackers.filter(
      (tracker) =>
        tracker.description.trim().includes(filterData.description) &&
        (filterData.startTime
          ? tracker.dateCreated >= +filterData.startTime
          : true) &&
        (filterData.endTime
          ? tracker.dateCreated <= +filterData.endTime
          : true),
    );
  }

  useEffect(() => {
    setTrackers(applySearchFilters(filterTrackers(storeTrackers, "history")));
  }, [storeTrackers, filterData]);

  return (
    <HistoryTemplate
      filterData={filterData}
      setFilterData={setFilterData}
      trackers={trackers}
    />
  );
}
