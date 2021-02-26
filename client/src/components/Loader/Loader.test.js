import { render } from '@testing-library/react';
import Loader from './Loader';
import '@testing-library/jest-dom/extend-expect';

test('renders a message', () => {
    const { getByTestId } = render(<Loader />)
    expect(getByTestId('loader')).toBeInTheDocument()
})
