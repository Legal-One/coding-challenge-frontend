import { useReducer, createContext, useMemo, FC } from 'react';
import reducer from '../reducer';
import { ContextType, ProviderProps } from '../types';

let initialState = {
	allLogs: [],
	dashboardSummary: {
		allCalls: 0,
		allAgents: 0,
		allCustomers: 0,
		tableData: null,
	},
};

const Context = createContext<ContextType | null>(null);

const Provider: FC<ProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

	return <Context.Provider value={contextValue as ContextType}>{children}</Context.Provider>;
};

export { Context, Provider };
