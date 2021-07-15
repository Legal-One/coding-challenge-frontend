import { FETCHED_DASHBOARD_DATA } from './actionTypes';

const reducer = (state: any, { type, payload }: any) => {
	switch (type) {
		case FETCHED_DASHBOARD_DATA:
			console.log(payload);
			return { ...state, dashboardSummary: payload.dashboardSummary, allLogs: payload.allLogs };
		default:
			return state;
	}
};

export default reducer;
