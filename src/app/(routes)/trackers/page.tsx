"use client";

// components
import TrackersTemplate from "@/app/_components/templates/trackersTemplate/TrackersTemplate";
// custom hooks
import withDataFetchingSubscription from "@/app/_helpers/WithDataFetchingSubscription";

const Trackers = withDataFetchingSubscription(TrackersTemplate);
export default Trackers;
