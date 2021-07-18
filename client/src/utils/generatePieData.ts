import { ResolutionTypes } from '../presentation/components/DataDisplay/types';
import { LogData } from '../presentation/pages/Dashboard/types';
import { PieData, PieFillObject, PieProps } from '../presentation/components/DataDisplay/types';

const generatePieData = (logs: LogData[]): PieProps => {
	const pieData: PieData[] = [];
	Object.values(ResolutionTypes).forEach(resolutionItem => {
		const item = logs.filter((log: any) => log.resolution === resolutionItem);
		const itemPercentage = Math.round((item.length / logs.length) * 100);
		pieData.push({
			id: resolutionItem,
			label: resolutionItem,
			value: itemPercentage,
		});
	});

	const pieFill = generatePieFill(pieData);
	return { pieData, pieFill };
};

const generatePieFill = (logs: PieData[]): PieFillObject[] => {
	return logs.map((log: any) => {
		let id = '';
		if (log.id === 'needs follow up') id = 'lines';
		if (log.id === 'need reschedule') id = 'dots';
		return {
			match: {
				id: log.id,
			},
			id: id,
		};
	});
};

export default generatePieData;
