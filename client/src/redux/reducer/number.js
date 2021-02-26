import {
    NUMBER_DATA_REQUEST,
    NUMBER_DATA_SUCCESS,
    NUMBER_DATA_FAILURE
} from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    numberData: [],
};

const numberReducer = (state = initialState, action) => {
    switch (action.type) {
        case NUMBER_DATA_REQUEST:
            return { ...state, loading: true, error: null, };
        case NUMBER_DATA_SUCCESS:
            return {
                ...state,
                numberData: action.numberData.logs,
                loading: false,
                error: null,
            };
        case NUMBER_DATA_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }

};

export { numberReducer };
