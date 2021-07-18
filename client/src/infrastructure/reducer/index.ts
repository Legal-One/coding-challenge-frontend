import { Reducer } from 'react';
import ActionTypes from './actionTypes';
import { IInitialState, IAction } from '../types';

const reducer: Reducer<IInitialState, IAction> = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case ActionTypes.FETCHED_DASHBOARD_DATA:
			return { ...state, dashboardSummary: payload.dashboardSummary, allLogs: payload.allLogs };
		default:
			return state;
	}
};

export default reducer;
