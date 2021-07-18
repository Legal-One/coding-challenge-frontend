import { Dispatch } from 'react';
import { LogExtendedData, LogData } from '../presentation/pages/Dashboard/types';
import ActionType from './reducer/actionTypes';

export interface ContextType {
	state: any;
	dispatch: Dispatch<any>;
}

export interface IContext<T> {
	Provider: Provider<T>;
	Consumer: Consumer<T>;
	displayName?: string;
}

export interface ProviderProps {
	children: JSX.Element[] | JSX.Element;
}

export type DashboardSummary = {
	readonly allCalls: number;
	readonly allAgents: number;
	readonly allCustomers: number;
	tableData: Array<LogExtendedData> | null;
};

export interface IInitialState {
	allLogs: Array<LogData>;
	dashboardSummary: DashboardSummary;
}

export interface IAction {
	type: ActionType;
	payload: {
		[key: string]: any;
	};
}
