import { FC, useContext } from 'react';
import BarChart from '../../../components/Common/BarChart';
import PieChart from '../../../components/Common/PieChart';
import { Card } from '../../../components/DataDisplay';
import { Context } from '../../../../infrastructure/context';
import generatePieData from '../../../../utils/generatePieData';

// const data = [
// 	{
// 		number: '+49151484522',
// 		count: 13,
// 	},
// 	{
// 		number: '+49158544147',
// 		count: 3,
// 	},
// 	{
// 		number: '+49151783331',
// 		count: 3,
// 	},
// 	{
// 		number: '+49151514231',
// 		count: 3,
// 	},
// 	{
// 		number: '+49221514231',
// 		count: 6,
// 	},
// ];

const ChartColumn: FC = (): JSX.Element => {
	const { state } = useContext<any>(Context);
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
					bottomAxisLegend="Phone numbers"
					leftAxisLegend="Phone calls"
				/>
			</Card>
			<Card className="dashboard__chartColumn--section">
				<h2>Call resolution statistics</h2>
				<PieChart data={pieData} fill={pieFill} />
			</Card>
		</section>
	);
};

export default ChartColumn;
