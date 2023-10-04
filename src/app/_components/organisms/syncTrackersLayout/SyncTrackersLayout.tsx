"use client";

import { useEffect, useState } from "react";
// custom hooks
import useStore from "@/app/_store/store";
import useFirebaseActions from "@/app/_hooks/firebase/useFirebaseActions";

export default function SyncTrackersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeTrackers = useStore((state) => state.trackers);
  const { syncTrackers } = useFirebaseActions();
  const [syncTrackerInterval, setSyncTrackerInterval] =
    useState<NodeJS.Timeout | null>(null);

  const startSyncingTrackers = () => {
    setSyncTrackerInterval(
      setInterval(
        () => {
          syncTrackers(storeTrackers);
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
