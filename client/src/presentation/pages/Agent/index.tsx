import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowIcon } from '../../../assets/SVG';

import UserInfo from './components/UserInfo';
import CallData from './components/CallData';
import useFetchAgentData from './hooks/useFetchAgentData';

const Agent: FC = () => {
	const params: any = useParams();
	const { agentData, agentLogs } = useFetchAgentData(params.id);
	const { goBack } = useHistory();
	const onGoBackClick = () => {
		goBack();
	};

	return (
		<main className="callPage page__wrapper">
			<div className="page__container">
				<section className="callPage__header">
					<button className="goBack" onClick={onGoBackClick}>
						<ArrowIcon />
						<p>Go Back</p>
					</button>
					<h2>
						Agent: <span>{agentData ? `${agentData.firstName} ${agentData.lastName}` : ''}</span>
					</h2>
				</section>
				<UserInfo data={agentData} logs={agentLogs} />
				<CallData records={agentLogs} />
			</div>
		</main>
	);
};

export default Agent;
