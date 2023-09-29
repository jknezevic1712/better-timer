export type TrackerToSend = {
  dateCreated: string;
  description: string;
  startTime: string;
  endTime: string;
  stopped: boolean;
};

export type TrackerFromDB = {
  id: string;
  dateCreated: number;
  description: string;
  startTime: string;
  endTime: string;
  loggedTime: string;
  stopped: boolean;
};
