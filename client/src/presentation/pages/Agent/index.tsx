import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowIcon } from '../../../assets/SVG';

import UserInfo from './components/UserInfo';
import CallData from './components/CallData';

const Agent: FC = () => {
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
						Agent: <span>Abraham Omale</span>
					</h2>
				</section>
				<UserInfo />
				<CallData />
			</div>
		</main>
	);
};

export default Agent;
