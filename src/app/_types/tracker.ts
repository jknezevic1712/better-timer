export interface TrackerForDB {
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

export interface TrackerForApp extends TrackerForDB {
  id: string;
  loggedTime: string;
}
