export interface CardProps {
	children: JSX.Element | JSX.Element[];
	className?: string;
}

export interface TableProps {
	tableHead: any;
	tableData: any;
}

export enum BadgeTypes {
	WARNING = 'warning',
	SUCCESS = 'success',
	DANGER = 'danger',
	INFO = 'info',
	PRIMARY = 'primary',
}

export type TBadge = `${BadgeTypes}`;

export enum ResolutionTypes {
	NEED_RESCHEDULE = 'need reschedule',
	INTERESTED = 'interested',
	NEEDS_FOLLOW_UP = 'needs follow up',
	NO_ANSWER = 'no answer',
}

export interface BadgeProps {
	text: string;
	type: BadgeTypes;
}
