import { Request, Response } from 'express';

import callLogs from '../json-data/logs.json';
import agents from '../json-data/agents.json';
import resolutions from '../json-data/resolution.json';

import { Call, CallLog, Agent, Resolution } from './types';

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
    data: {
      calls: transformedData,
      totalAgents: agents.length,
      totalCalls: callLogs.length,
    },
  });
};

export const getAgentCalls = (request: Request, response: Response) => {
  const { ID: agentId } = request.params;

  const callAgent = agents.find((agent: Agent) => agent.identifier === agentId);

  if (!callAgent) {
    return response.status(404).json({
      status: 'error',
      message: `Agent with ID ${agentId} does not exist`,
    });
  }

  const agentCalls = callLogs
    .filter((callLog: CallLog) => callLog.agentIdentifier === agentId)
    .map((callLog: CallLog) => {
      const resolution = resolutions.find(
        (resolution: Resolution) => resolution.identifier === callLog.identifier
      );

      return {
        ...callLog,
        resolution: resolution?.resolution,
      };
    });

  return response.status(200).json({
    status: 'success',
    data: {
      agent: callAgent,
      calls: agentCalls,
    },
  });
};

export const getCallDetails = (request: Request, response: Response) => {
  const { number } = request.params;

  if (!number) {
    return response.status(400).json({
      status: 'error',
      message: 'The number field is required',
    });
  }

  const calls = callLogs
    .filter((callLog: CallLog) => callLog.number === number)
    .map((callLog: CallLog) => {
      const resolution = resolutions.find(
        (resolution: Resolution) => resolution.identifier === callLog.identifier
      );

      const callAgent = agents.find(
        (agent: Agent) => agent.identifier === callLog.agentIdentifier
      );

      return {
        dateTime: callLog.dateTime,
        duration: callLog.duration,
        resolution: resolution?.resolution,
        agent: callAgent,
      };
    });

  if (!calls.length) {
    return response.status(404).json({
      status: 'error',
      message: `No call log exists for ${number}`,
    });
  }

  return response.status(200).json({
    status: 'success',
    data: calls,
  });
};
