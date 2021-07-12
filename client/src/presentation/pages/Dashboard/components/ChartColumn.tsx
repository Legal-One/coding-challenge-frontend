import BarChart from '../../../components/Common/BarChart';
import PieChart from '../../../components/Common/PieChart';
import { Card } from '../../../components/DataDisplay';

const data = [
	{
		phoneNumber: '+49151484522',
		calls: 13,
	},
	{
		phoneNumber: '+49158544147',
		calls: 3,
	},
	{
		phoneNumber: '+49151783331',
		calls: 3,
	},
	{
		phoneNumber: '+49151514231',
		calls: 3,
	},
	{
		phoneNumber: '+49221514231',
		calls: 6,
	},
];

const pieData = [
	{
		id: 'scala',
		label: 'scala',
		value: 429,
		color: 'hsl(299, 70%, 50%)',
	},
	{
		id: 'java',
		label: 'java',
		value: 359,
		color: 'hsl(190, 70%, 50%)',
	},
	{
		id: 'rust',
		label: 'rust',
		value: 4,
		color: 'hsl(339, 70%, 50%)',
	},
	{
		id: 'elixir',
		label: 'elixir',
		value: 532,
		color: 'hsl(7, 70%, 50%)',
	},
	{
		id: 'php',
		label: 'php',
		value: 393,
		color: 'hsl(226, 70%, 50%)',
	},
];

const ChartColumn = () => {
	return (
		<section className="dashboard__chartColumn">
			<Card className="dashboard__chartColumn--section">
				<h2>Call Frequency</h2>
				<BarChart
					data={data}
					keys={['calls']}
					indexBy="phoneNumber"
					bottomAxisLegend="Phone numbers"
					leftAxisLegend="Phone calls"
				/>
			</Card>
			<Card className="dashboard__chartColumn--section">
				<h2>Call Frequency</h2>
				<PieChart data={pieData} />
			</Card>
		</section>
	);
};

export default ChartColumn;
