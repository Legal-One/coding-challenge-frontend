import { FC } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { BarChartProps } from './types';

const BarChart: FC<BarChartProps> = props => {
	const { data, indexBy, keys } = props;
	return (
		<ResponsiveBar
			data={data}
			layout="horizontal"
			keys={keys}
			indexBy={indexBy}
			margin={{ top: 50, right: 110, bottom: 50, left: 90 }}
			padding={0.4}
			valueScale={{ type: 'linear' }}
			indexScale={{ type: 'band', round: true }}
			valueFormat={(v: number) => `${Math.abs(v)}`}
			colors={'#00a0f0'}
			borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
			axisTop={undefined}
			axisRight={undefined}
			defs={[
				{
					id: 'lines',
					type: 'patternLines',
					background: 'inherit',
					color: '#0085c8',
					rotation: -45,
					lineWidth: 6,
					spacing: 10,
				},
			]}
			fill={[
				{
					match: {
						id: 'calls',
					},
					id: 'lines',
				},
			]}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: '',
				legendPosition: 'middle',
				legendOffset: 32,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: '',
				legendPosition: 'middle',
				legendOffset: -40,
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={'#fff'}
			legends={[
				{
					dataFrom: 'keys',
					anchor: 'bottom-right',
					direction: 'row',
					justify: false,
					translateX: 120,
					translateY: 0,
					itemsSpacing: 2,
					itemWidth: 100,
					itemHeight: 20,
					itemDirection: 'left-to-right',
					itemOpacity: 0.85,
					symbolSize: 20,
					effects: [
						{
							on: 'hover',
							style: {
								itemOpacity: 1,
							},
						},
					],
				},
			]}
		/>
	);
};

export default BarChart;
