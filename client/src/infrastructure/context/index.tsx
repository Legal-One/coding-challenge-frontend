import { useReducer, createContext, useMemo, Dispatch } from 'react';
import reducer from '../reducer';

let initialState = {
	allLogs: [],
	dashboardSummary: {
		allCalls: 0,
		allAgents: 0,
		allCustomers: 0,
		tableData: null,
	},
};

interface ContextType {
	state: any;
	dispatch: Dispatch<any>;
}

const Context = createContext<ContextType | null>(null);

const Provider = ({ children }: any) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

	return <Context.Provider value={contextValue as ContextType}>{children}</Context.Provider>;
};

export { Context, Provider };
