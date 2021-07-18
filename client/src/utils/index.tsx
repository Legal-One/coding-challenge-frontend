import { types } from '../presentation/components/DataDisplay';

const { BadgeTypes } = types;

const selectType = (resolution: string): any => {
	switch (resolution) {
		case 'need reschedule':
			return BadgeTypes.PRIMARY;
		case 'interested':
			return BadgeTypes.SUCCESS;
		case 'needs follow up':
			return BadgeTypes.WARNING;
		case 'no answer':
			return BadgeTypes.DANGER;
		default:
			return BadgeTypes.INFO;
	}
};

export { selectType };
