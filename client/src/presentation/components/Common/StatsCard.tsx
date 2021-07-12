import { FC } from 'react';
import { Card } from '../DataDisplay';
import { StatsCardProps } from './types';

const StatsCard: FC<StatsCardProps> = (props): JSX.Element => {
	const { Icon, title, value } = props;
	return (
		<Card>
			<div className="stats-card">
				<div className="stats-card__icon">
					<Icon />
				</div>
				<div className="stats-card__info">
					<p>{title}</p>
					<h3>{value}</h3>
				</div>
			</div>
		</Card>
	);
};

export default StatsCard;
