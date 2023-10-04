export interface TrackerToSend {
  dateCreated: {
    ms: string;
    formatted: string;
  };
  description: string;
  startTime: string;
  endTime: string;
  active: boolean;
  running: boolean;
}

export interface TrackerFromDB extends TrackerToSend {
  id: string;
  loggedTime: string;
}
