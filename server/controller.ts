import { Request, Response } from 'express';

import callLogs from '../json-data/logs.json';
import agents from '../json-data/agents.json';

import { Call, CallLog, Agent } from './types';

export const getAllCalls = (_request: Request, response: Response) => {
  const allCalls: Call<CallLog> = {};

  callLogs.forEach((callLog: CallLog) => {
    if (allCalls[callLog.number]) {
      allCalls[callLog.number].push(callLog);
    } else {
      allCalls[callLog.number] = [callLog];
    }
  });

  const transformedData = Object.keys(allCalls).map((number: string) => {
    const allCallsForNumber = allCalls[number];
    const numberOfCalls = allCallsForNumber.length;

    const sortedCalls = allCallsForNumber.sort(
      ({ dateTime: currentCallTime }, { dateTime: nextCallTime }) => {
        if (currentCallTime > nextCallTime) {
          return -1;
        }

        if (currentCallTime < nextCallTime) {
          return 1;
        }

        return 0;
      }
    );

    const lastCall = sortedCalls[0];

    const callAgent: Agent | undefined = agents.find(
      (agent: Agent) => agent.identifier === lastCall.agentIdentifier
    );

    return {
      phoneNumber: number,
      numberOfCalls,
      lastCall: {
        agent: callAgent,
        duration: lastCall.duration,
        dateTime: lastCall.dateTime,
      },
    };
  });

  return response.status(200).json({
    status: 'success',
    data: transformedData,
  });
};
