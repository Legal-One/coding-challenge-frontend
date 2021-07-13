import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowIcon } from '../../../assets/SVG';

import CallData from './components/CallData';

const Agent: FC<JSX.Element> = (): JSX.Element => {
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
						Phone Number: <span>+29388399290</span>
					</h2>
				</section>
				<CallData />
			</div>
		</main>
	);
};

export default Agent;
