import { useEffect } from "react";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/useFirebaseActions";

export default function withDataFetchingSubscription(
  Component: (props: any) => React.ReactNode,
) {
  return function DataFetchingComponent(props: any) {
    const { unsubscribeFromFetchTrackers, fetchTrackersSubscription } =
      useFirebaseActions();

    useEffect(() => {
      fetchTrackersSubscription();

      const unsubscribe = unsubscribeFromFetchTrackers.current;
      return () => {
        unsubscribe && unsubscribe();
      };
    }, []);

    return <Component {...props} />;
  };
}
