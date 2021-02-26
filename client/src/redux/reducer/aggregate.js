import {
    AGGREGATE_DATA_REQUEST,
    AGGREGATE_DATA_SUCCESS,
    AGGREGATE_DATA_FAILURE
} from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    aggregateData: [],
};

const aggregateReducer = (state = initialState, action) => {
    switch (action.type) {
        case AGGREGATE_DATA_REQUEST:
            return { ...state, loading: true, error: null, };
        case AGGREGATE_DATA_SUCCESS:
            return {
                ...state,
                aggregateData: action.aggregateData.logs,
                loading: false,
                error: null,
            };
        case AGGREGATE_DATA_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }

};

export { aggregateReducer };
