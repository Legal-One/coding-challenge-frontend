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

export type Resolution = {
  identifier: string;
  resolution: string;
};

export interface AllCalls {
  phoneNumber: string;
  numberOfCalls: number;
  lastCall: {
    agent: Agent;
    duration: number;
    dateTime: string;
  };
}

export interface AgentCalls extends CallLog {
  resolution: string;
}

export interface CallDetails {
  dateTime: string;
  duration: string;
  resolution: string;
  agent: Agent;
}
