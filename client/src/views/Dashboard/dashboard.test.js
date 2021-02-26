import { render, waitFor } from '@testing-library/react';
import Dashboard from './';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../redux/store';

test('renders a message', async () => { 
    const { getByTestId } = render(<Provider store={store}><Dashboard /></Provider>)
    expect(getByTestId('loader')).toBeInTheDocument()
    expect(getByTestId('dashboard')).toBeInTheDocument()

    waitFor(() => {
        expect(getByTestId('number')).toBeInTheDocument()
        fireEvent.click(getByTestId('bb'))
        expect(getByTestId('dashboard')).toBeInTheDocument()
    }, { timeout: 1000 });
})
