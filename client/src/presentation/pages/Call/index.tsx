import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowIcon } from '../../../assets/SVG';
import useFetchCallData from './hooks/useFetchCallData';

import CallData from './components/CallData';

const Agent: FC<JSX.Element> = (): JSX.Element => {
	const params: any = useParams();
	const { callRecords } = useFetchCallData(params?.id);

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
						Phone Number: <span>{params.id}</span>
					</h2>
				</section>
				<CallData records={callRecords ? callRecords : []} />
			</div>
		</main>
	);
};

export default Agent;
