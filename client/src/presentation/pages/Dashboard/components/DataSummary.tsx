import { FC, useContext } from 'react';
import StatsCard from '../../../components/Common/StatsCard';
import { summaryData } from '../constants';
import { Context } from '../../../../infrastructure/context';

const DataSummary: FC = (): JSX.Element => {
	const { state } = useContext<any>(Context);
	const { dashboardSummary } = state;

	const renderCards = () => {
		const dataInfo = [...summaryData];
		dataInfo[0].value = dashboardSummary.allCalls;
		dataInfo[1].value = dashboardSummary.allAgents;
		dataInfo[2].value = dashboardSummary.allCustomers;
		return dataInfo.map((data, i) => <StatsCard key={i} Icon={data.Icon} title={data.title} value={data.value} />);
	};
	return <section className="dashboard__data-summary">{renderCards()}</section>;
};

export default DataSummary;
