"use client";

import { useState, useEffect } from "react";
// components
import HistoryTemplate, {
  filterInitialData,
} from "@/app/_components/templates/historyTemplate/HistoryTemplate";
// custom hooks
import useStore from "@/app/_hooks/store/store";
// types
import type { TrackerForApp } from "@/app/_types/tracker";
import type { FilterData } from "@/app/_components/templates/historyTemplate/HistoryTemplate";
// helpers
import { filterTrackers } from "@/app/_helpers/helpers";
import withDataFetchingSubscription from "@/app/_helpers/WithDataFetchingSubscription";

function History() {
  const storeTrackers = useStore((state) => state.trackers);
  const [trackers, setTrackers] = useState<TrackerForApp[]>([]);
  const [filterData, setFilterData] = useState<FilterData>(filterInitialData);

  function applySearchFilters(trackers: TrackerForApp[]) {
    return trackers.filter(
      (tracker) =>
        tracker.description.trim().includes(filterData.description) &&
        (filterData.startTime
          ? +tracker.dateCreated.ms >= +filterData.startTime
          : true) &&
        (filterData.endTime
          ? +tracker.dateCreated.ms <= +filterData.endTime
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

const HomeWithSubscription = withDataFetchingSubscription(History);

export default HomeWithSubscription;
