import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// actionType
import {
    AGGREGATE_DATA_REQUEST,
    AGGREGATE_DATA_SUCCESS,
    AGENT_DATA_REQUEST,
    AGENT_DATA_SUCCESS,
    NUMBER_DATA_REQUEST,
    NUMBER_DATA_SUCCESS
} from './actionTypes';

// action
import { getAggregate, getAgent, getNumber } from './actions';
import { getNumberData } from '../services/apiRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('Log Actions', () => {
    afterEach(() => {
        mock.reset();
    });
    it('Fetches aggregate data', () => {
        mock.onGet(`http://localhost:3000/api/v1/logs`)
            .reply(200, {
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
            });

        const mockedActions = [
            {
                type: AGGREGATE_DATA_REQUEST,
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
            },
        ];

        const store = mockStore({
            aggregateData: {
                loading: false,
                error: null,
                aggregateData: []
            }
        });
        return store.dispatch(getAggregate())
            .then(() => {
                expect(store.getActions()).toEqual(mockedActions);
            });
    });
    it('Fetches agent data', () => {
        mock.onGet(`http://localhost:3000/api/v1/agents/356b03dc-9ec5-11e7-97a6-d501104f897e`)
            .reply(200, {
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

            });

        const mockedActions = [
            {
                type: AGENT_DATA_REQUEST,
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
            },
        ];

        const store = mockStore({
            agentData: {
                loading: false,
                error: null,
                agentData: []
            }
        });
        return store.dispatch(getAgent('356b03dc-9ec5-11e7-97a6-d501104f897e')) 
            .then(() => {
                expect(store.getActions()).toEqual(mockedActions);
            });
    });
    it('Fetches number data', () => {
        mock.onGet(`http://localhost:3000/api/v1/logs/+49151484522`)
            .reply(200, {
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
            });

        const mockedActions = [
            {
                type: NUMBER_DATA_REQUEST,
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
            },
        ];

        const store = mockStore({
            numberData: {
                loading: false,
                error: null,
                numberData: []
            }
        });
        return store.dispatch(getNumber('+49151484522'))
            .then(() => {
                expect(store.getActions()).toEqual(mockedActions);
            });
    });
});
