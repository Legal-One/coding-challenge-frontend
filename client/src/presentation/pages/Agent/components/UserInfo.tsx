import { FC } from 'react';
import { Card } from '../../../components/DataDisplay';
import PieChart from '../../../components/Common/PieChart';
import generatePieData from '../../../../utils/generatePieData';

import { UserInfoProps } from '../types';

const UserInfo: FC<UserInfoProps> = ({ data, logs }) => {
	if (!data) return <></>;
	const { firstName, lastName, photo, email } = data;
	const { pieData, pieFill } = generatePieData(logs);
	return (
		<section className="agentPage dashboard__chartColumn">
			<Card className="agentPage__profile dashboard__chartColumn--section">
				<img src={photo} alt="prf" />
				<h3>{`${firstName} ${lastName}`}</h3>
				<p>{email}</p>
				<p>
					Total Calls: <span>{logs.length}</span>
				</p>
			</Card>
			<Card className="dashboard__chartColumn--section">
				<h2>Call Frequency</h2>
				<PieChart pieData={pieData} pieFill={pieFill} />
			</Card>
		</section>
	);
};

export default UserInfo;
