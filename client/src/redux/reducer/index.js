import { combineReducers } from 'redux';
import { numberReducer } from './number';
import { aggregateReducer } from './aggregate';
import { agentReducer } from './agent';

export default combineReducers({
    agentData: agentReducer,
    numberData: numberReducer,
    aggregateData: aggregateReducer,
});
