export interface StatsCardProps {
	Icon: JSX;
	title: string;
	value: string | number;
}

export interface BarChartData {
	[key: string]: string | number;
}

export interface BarChartProps {
	data: BarChartData[];
	keys: string[];
	indexBy: string;
	bottomAxisLegend: string;
	leftAxisLegend: string;
}
