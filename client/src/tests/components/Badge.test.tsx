import { render, screen } from '@testing-library/react';
import Badge from '../../presentation/components/DataDisplay/Badge';
import { BadgeTypes } from '../../presentation/components/DataDisplay/types';

beforeEach(() => {
	render(<Badge text="not following" type={BadgeTypes.PRIMARY} />);
});

describe('Badge Component tests', () => {
	test('Should take snapshot of badge', () => {
		const { asFragment } = render(<Badge text="not following" type={BadgeTypes.PRIMARY} />);
		expect(asFragment()).toMatchSnapshot();
	});
	test("Should have text 'not following'", () => {
		expect(screen.getByTestId('badge')).toHaveTextContent('not following');
	});
});
