export type CallLog = {
  identifier: string;
  agentIdentifier: string;
  number: string;
  dateTime: string;
  duration: number;
};

export interface Call<CallLog> {
  [identifier: string]: Array<CallLog>;
}

export type Agent = {
  identifier: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
};
