import { FC } from 'react';
import DataSummary from './components/DataSummary';
import ChartColumn from './components/ChartColumn';
import AllCalls from './components/AllCalls';

const Home: FC<JSX.Element> = (): JSX.Element => {
	return (
		<main className="dashboard page__wrapper">
			<div className="page__container">
				<div className="dashboard__intro">
					<h2>Dashboard</h2>
					<p>Call center agents calls summary and statistics</p>
				</div>
				<DataSummary />
				<ChartColumn />
				<AllCalls />
			</div>
		</main>
	);
};

export default Home;
