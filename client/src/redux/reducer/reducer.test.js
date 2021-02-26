// actionType
import {
    AGGREGATE_DATA_REQUEST,
    AGENT_DATA_REQUEST,
    AGGREGATE_DATA_SUCCESS,
    AGGREGATE_DATA_FAILURE,
    NUMBER_DATA_FAILURE,
    AGENT_DATA_FAILURE,
    AGENT_DATA_SUCCESS,
    NUMBER_DATA_REQUEST,
    NUMBER_DATA_SUCCESS
} from '../actionTypes';

// reducer
import { aggregateReducer } from './aggregate';
import { agentReducer } from './agent';
import { numberReducer } from './number';

describe('reducer', () => {
    it('should handle AGGREGATE_DATA_REQUEST', () => {
        expect(
            aggregateReducer([], {
                type: AGGREGATE_DATA_REQUEST
            })
        ).toEqual({
            loading: true,
            error: null
        });
    });
    it('should handle AGGREGATE_DATA_SUCCESS', () => {
        expect(
            aggregateReducer(
                {
                    loading: false,
                    error: null,
                    aggregateData: [],
                },
                {
                    type: AGGREGATE_DATA_SUCCESS,
                    aggregateData: {
                        success: true,
                        message: 'Success',
                        logs: [
                            {
                                agent: {
                                    identifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
                                    firstName: "Abraham",
                                    lastName: "Ellis",
                                    email: "Abraham.Ellis@callcenter.xyz",
                                    photo: "https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson"
                                },
                                dateTime: "2020-10-05T14:48:00.000Z",
                                duration: 230,
                                number: "+49151484522",
                                id: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                                count: 13
                            },
                        ]
                    },
                }
            )
        ).toEqual({
            aggregateData: [
                {
                    agent: {
                        identifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
                        firstName: "Abraham",
                        lastName: "Ellis",
                        email: "Abraham.Ellis@callcenter.xyz",
                        photo: "https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson"
                    },
                    dateTime: "2020-10-05T14:48:00.000Z",
                    duration: 230,
                    number: "+49151484522",
                    id: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                    count: 13
                },
            ],
            error: null,
            loading: false,
        }); 
    });
    it('should handle AGGREGATE_DATA_FAILURE', () => {
        expect(
            aggregateReducer([], {
                type: AGGREGATE_DATA_FAILURE,
                error: 'Failed',
            })
        ).toEqual({
            loading: false,
            error: 'Failed',
        });
    });
    it('should handle AGENT_DATA_REQUEST', () => {
        expect(
            agentReducer([], {
                type: AGENT_DATA_REQUEST
            })
        ).toEqual({
            loading: true,
            error: null
        });
    });
    it('should handle AGENT_DATA_SUCCESS', () => {
        expect(
            agentReducer(
                {
                    loading: false,
                    error: null,
                    agentData: [],
                },
                {
                    type: AGENT_DATA_SUCCESS,
                    agentData: {
                        success: true,
                        message: 'Success',
                        agent: {
                            identifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
                            firstName: "Abraham",
                            lastName: "Ellis",
                            email: "Abraham.Ellis@callcenter.xyz",
                            photo: "https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson",
                            logs: [
                                {
                                    identifier: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                                    agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
                                    number: "+49151484522",
                                    dateTime: "2020-10-05T14:48:00.000Z",
                                    duration: 230,
                                    id: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                                    resolution: {
                                        identifier: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                                        resolution: "need reschedule"
                                    }
                                },
                            ]
                        }
                    },
                }
            )
        ).toEqual({
            agentData: [
                {
                    identifier: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                    agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
                    number: "+49151484522",
                    dateTime: "2020-10-05T14:48:00.000Z",
                    duration: 230,
                    id: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                    resolution: {
                        identifier: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                        resolution: "need reschedule"
                    }
                },
            ],
            error: null,
            loading: false,
        });
    });
    it('should handle AGENT_DATA_FAILURE', () => {
        expect(
            agentReducer([], {
                type: AGENT_DATA_FAILURE,
                error: 'Failed',
            })
        ).toEqual({
            loading: false,
            error: 'Failed',
        });
    });
    it('should handle NUMBER_DATA_REQUEST', () => {
        expect(
            numberReducer([], {
                type: NUMBER_DATA_REQUEST
            })
        ).toEqual({
            loading: true,
            error: null
        });
    });
    it('should handle NUMBER_DATA_SUCCESS', () => {
        expect(
            numberReducer(
                {
                    loading: false,
                    error: null,
                    numberData: [],
                },
                {
                    type: NUMBER_DATA_SUCCESS,
                    numberData: {
                        success: true,
                        message: 'Success',
                        logs: {
                            identifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
                            firstName: "Abraham",
                            lastName: "Ellis",
                            email: "Abraham.Ellis@callcenter.xyz",
                            photo: "https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson",
                            logs: [
                                {
                                    identifier: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                                    agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
                                    number: "+49151484522",
                                    dateTime: "2020-10-05T14:48:00.000Z",
                                    duration: 230,
                                    id: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                                    agent: {
                                        identifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
                                        firstName: "Abraham",
                                        lastName: "Ellis",
                                        email: "Abraham.Ellis@callcenter.xyz",
                                        photo: "https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson"
                                    },
                                    resolution: {
                                        identifier: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                                        resolution: "need reschedule"
                                    }
                                },
                            ]
                        }
                    },
                }
            )
        ).toEqual({
            numberData: {
            identifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
            firstName: "Abraham",
            lastName: "Ellis",
            email: "Abraham.Ellis@callcenter.xyz",
            photo: "https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson",
            logs: [
                {
                    identifier: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                    agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
                    number: "+49151484522",
                    dateTime: "2020-10-05T14:48:00.000Z",
                    duration: 230,
                    id: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                    agent: {
                        identifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
                        firstName: "Abraham",
                        lastName: "Ellis",
                        email: "Abraham.Ellis@callcenter.xyz",
                        photo: "https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson"
                    },
                    resolution: {
                        identifier: "f53b3e0e-6a21-11eb-9439-0242ac130002",
                        resolution: "need reschedule"
                    }
                },
            ]
        },
            error: null,
            loading: false,
        });
    });
    it('should handle NUMBER_DATA_FAILURE', () => {
        expect(
            numberReducer([], {
                type: NUMBER_DATA_FAILURE,
                error: 'Failed',
            })
        ).toEqual({
            loading: false,
            error: 'Failed',
        });
    });
});
