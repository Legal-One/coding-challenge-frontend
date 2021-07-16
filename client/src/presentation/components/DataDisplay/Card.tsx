import { FC } from 'react';
import { CardProps } from './types';

const Card: FC<CardProps> = ({ children, className }): JSX.Element => {
	return <div className={`card ${className || ''}`}>{children}</div>;
};

export default Card;
