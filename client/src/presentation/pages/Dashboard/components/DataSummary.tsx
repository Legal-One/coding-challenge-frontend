import StatsCard from '../../../components/Common/StatsCard';
import { summaryData } from '../constants';

const DataSummary = () => {
	const renderCards = () => {
		return summaryData.map((data, i) => (
			<StatsCard key={i} Icon={data.Icon} title={data.title} value={data.value} />
		));
	};
	return <section className="dashboard__data-summary">{renderCards()}</section>;
};

export default DataSummary;
