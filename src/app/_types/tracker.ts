export type TrackerToSend = {
  dateCreated: string;
  description: string;
  startTime: string;
  endTime: string;
  active: boolean;
  running: boolean;
};

export type TrackerFromDB = {
  id: string;
  dateCreated: number;
  description: string;
  startTime: string;
  endTime: string;
  loggedTime: string;
  active: boolean;
  running: boolean;
};
