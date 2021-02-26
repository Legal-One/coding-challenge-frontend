import {
    AGENT_DATA_REQUEST,
    AGENT_DATA_SUCCESS,
    AGENT_DATA_FAILURE
} from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    agentData: [],
};

const agentReducer = (state = initialState, action) => {
    switch (action.type) {
        case AGENT_DATA_REQUEST:
            return { ...state, loading: true, error: null, };
        case AGENT_DATA_SUCCESS:
            return {
                ...state,
                agentData: action.agentData.agent.logs,
                loading: false,
                error: null,
            };
        case AGENT_DATA_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }

};

export { agentReducer };
