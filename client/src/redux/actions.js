import {
    AGGREGATE_DATA_REQUEST,
    AGGREGATE_DATA_SUCCESS,
    AGGREGATE_DATA_FAILURE,
    AGENT_DATA_FAILURE,
    AGENT_DATA_REQUEST,
    AGENT_DATA_SUCCESS,
    NUMBER_DATA_FAILURE,
    NUMBER_DATA_REQUEST,
    NUMBER_DATA_SUCCESS
} from './actionTypes';

import {
    getAgentData,
    getNumberData,
    getAggregateData
} from '../services/apiRequest';


export const getAggregate = () => async (dispatch) => {
    dispatch({
        type: AGGREGATE_DATA_REQUEST,
    });
    try {
        const aggregateData = await getAggregateData();
        dispatch({
            type: AGGREGATE_DATA_SUCCESS,
            aggregateData: aggregateData.data,
        });
    } catch (e) {
        dispatch({
            type: AGGREGATE_DATA_FAILURE,
            error: e.message,
        });
        return e.message;
    }
};

export const getAgent = (agentId) => async (dispatch) => {
    dispatch({
        type: AGENT_DATA_REQUEST,
    });
    try {
        const agentData = await getAgentData(agentId);
        dispatch({
            type: AGENT_DATA_SUCCESS,
            agentData: agentData.data,
        });
    } catch (e) {
        dispatch({
            type: AGENT_DATA_FAILURE,
            error: e.message,
        });
        return e.message;
    }
};

export const getNumber = (number) => async (dispatch) => {
    dispatch({
        type: NUMBER_DATA_REQUEST,
    });
    try {
        const numberData = await getNumberData(number);
        dispatch({
            type: NUMBER_DATA_SUCCESS,
            numberData: numberData.data,
        });
    } catch (e) {
        dispatch({
            type: NUMBER_DATA_FAILURE,
            error: e.message,
        });
        return e.message;
    }
};
