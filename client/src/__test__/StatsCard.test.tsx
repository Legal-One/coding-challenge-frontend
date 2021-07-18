import { render, cleanup } from '@testing-library/react';

import StatsCard from '../presentation/components/Common/StatsCard';
import { AgentIcon } from '../assets/SVG';

afterEach(cleanup);

describe('StatsCard component test', () => {
	test('Should take snapshot of table', () => {
		const { asFragment } = render(<StatsCard value={5} title="Total numbers" Icon={AgentIcon} />);
		expect(asFragment()).toMatchSnapshot();
	});
	test('Should have display right text', () => {
		const { getByTestId } = render(<StatsCard value={2} title="Total numbers" Icon={AgentIcon} />);
		expect(getByTestId('stats-value')).toHaveTextContent('2');
		expect(getByTestId('stats-title')).toHaveTextContent('Total numbers');

		expect(getByTestId('stats-value')).not.toHaveTextContent('5');
	});
});
