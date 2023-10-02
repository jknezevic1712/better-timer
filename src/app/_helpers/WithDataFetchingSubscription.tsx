import { useEffect } from "react";
// custom hooks
import useFirebaseActions from "@/app/_hooks/firebase/useFirebaseActions";

export default function withDataFetchingSubscription(
  Component: (props: any) => React.ReactNode,
) {
  return function DataFetchingComponent(props: any) {
    const { unsubscribeFetchTrackers, fetchTrackers } = useFirebaseActions();

    useEffect(() => {
      fetchTrackers();

      const unsubscribe = unsubscribeFetchTrackers.current;
      return () => {
        unsubscribe && unsubscribe();
      };
    }, []);

    return <Component {...props} />;
  };
}
