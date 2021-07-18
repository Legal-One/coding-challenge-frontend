import { FC, useContext } from 'react';
import BarChart from '../../../components/Common/BarChart';
import PieChart from '../../../components/Common/PieChart';
import { Card } from '../../../components/DataDisplay';
import { Context } from '../../../../infrastructure/context';
import generatePieData from '../../../../utils/generatePieData';
import { ContextType } from '../../../../infrastructure/types';

const ChartColumn: FC = (): JSX.Element => {
	const { state } = useContext<ContextType | any>(Context);
	const {
		allLogs,
		dashboardSummary: { tableData },
	} = state;
	const { pieData, pieFill } = generatePieData(allLogs);
	return (
		<section className="dashboard__chartColumn">
			<Card className="dashboard__chartColumn--section">
				<h2>Call Frequency</h2>
				<BarChart
					data={tableData ? tableData : []}
					keys={['count']}
					indexBy="number"
					bottomAxisLegend="Phone calls"
					leftAxisLegend="Phone numbers"
				/>
			</Card>
			<Card className="dashboard__chartColumn--section">
				<h2>Call resolution statistics</h2>
				<PieChart pieData={pieData} pieFill={pieFill} />
			</Card>
		</section>
	);
};

export default ChartColumn;
