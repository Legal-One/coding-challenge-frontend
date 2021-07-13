import { Card } from '../../../components/DataDisplay';
import PieChart from '../../../components/Common/PieChart';

import profileImg from '../../../../assets/FFFFFF.png';

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

const UserInfo = () => {
	return (
		<section className="agentPage dashboard__chartColumn">
			<Card className="agentPage__profile dashboard__chartColumn--section">
				<img src={profileImg} alt="prf" />
				<h3>Gideon Nnalue</h3>
				<p>gideonnnalue@yahoo.com</p>
				<p>
					Total Calls: <span>13</span>
				</p>
			</Card>
			<Card className="dashboard__chartColumn--section">
				<h2>Call Frequency</h2>
				<PieChart data={pieData} />
			</Card>
		</section>
	);
};

export default UserInfo;
