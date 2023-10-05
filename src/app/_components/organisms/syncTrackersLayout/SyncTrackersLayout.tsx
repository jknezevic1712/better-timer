"use client";

import { useEffect, useState } from "react";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/useFirebaseActions";

export default function SyncTrackersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { syncTrackers } = useFirebaseActions();
  const [syncTrackerInterval, setSyncTrackerInterval] =
    useState<NodeJS.Timeout | null>(null);

  const startSyncingTrackers = () => {
    setSyncTrackerInterval(
      setInterval(
        () => {
          syncTrackers();
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
