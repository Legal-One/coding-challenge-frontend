import { FC, useEffect, useContext } from 'react';
import DataSummary from './components/DataSummary';
import ChartColumn from './components/ChartColumn';
import AllCalls from './components/AllCalls';

import useFetchDashboardData from './hooks/useFetchDashboardData';
import { Context } from '../../../infrastructure/context';
import { ContextType } from '../../../infrastructure/types';

import ActionTypes from '../../../infrastructure/reducer/actionTypes';
const Dashboard: FC<JSX.Element> = (): JSX.Element => {
	const { allLogs, dashboardData, totalCalls, totalCustomers, totalAgents } = useFetchDashboardData();

	const { dispatch } = useContext<ContextType | any>(Context);

	useEffect(() => {
		const dashboardSummary = {
			allCalls: totalCalls,
			allAgents: totalAgents,
			allCustomers: totalCustomers,
			tableData: dashboardData,
		};
		dispatch({
			type: ActionTypes.FETCHED_DASHBOARD_DATA,
			payload: { allLogs, dashboardSummary },
		});
	}, [dispatch, dashboardData, totalCalls, totalAgents, totalCustomers, allLogs]);

	return (
		<main className="dashboard page__wrapper">
			<div className="page__container">
				<section className="dashboard__intro">
					<h2>Dashboard</h2>
					<p>Call center agents calls summary and statistics</p>
				</section>
				<DataSummary />
				<ChartColumn />
				<AllCalls />
			</div>
		</main>
	);
};

export default Dashboard;
