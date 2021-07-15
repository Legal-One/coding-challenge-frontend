import { ResolutionTypes } from '../presentation/components/DataDisplay/types';

const generatePieData = (logs: any): any => {
	const pieData: any = [];
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
	console.log(pieFill);
	return { pieData, pieFill };
};

const generatePieFill = (logs: any): any => {
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
