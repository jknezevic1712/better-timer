"use client";

import { useEffect, useState } from "react";
// custom hooks
import useStore from "@/app/_store/store";

export default function SyncTrackersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeTrackers = useStore((state) => state.trackers);
  const [syncTrackerInterval, setSyncTrackerInterval] =
    useState<NodeJS.Timeout | null>(null);

  const startSyncingTrackers = () => {
    setSyncTrackerInterval(
      setInterval(
        () => {
          // syncTrackers(storeTrackers)
        },
        5000, // TODO: set to 60000 (minute)
      ),
    );
  };

  function stopSyncingTrackers() {
    if (syncTrackerInterval) {
      clearInterval(syncTrackerInterval);
      setSyncTrackerInterval(null);
    }
  }

  useEffect(() => {
    startSyncingTrackers();
    return () => stopSyncingTrackers();
  }, []);

  return { children };
}
