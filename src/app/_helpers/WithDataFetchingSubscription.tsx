import { useEffect } from "react";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/actions";

export default function withDataFetchingSubscription(
  Component: (props: any) => React.ReactNode,
) {
  return function DataFetchingComponent(props: any) {
    const { unsubscribeFetchTrackers, fetchTrackers } = useFirebaseActions();

    useEffect(() => {
      fetchTrackers();

      return () => {
        unsubscribeFetchTrackers && unsubscribeFetchTrackers();
      };
    }, []);

    return <Component {...props} />;
  };
}
