import { FC } from 'react';
import { BadgeProps } from './types';

const Badge: FC<BadgeProps> = (props): JSX.Element => {
	const { text, type } = props;
	return <span className={`badge ${type}`}>{text}</span>;
};

export default Badge;
