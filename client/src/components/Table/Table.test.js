import { render, screen } from '@testing-library/react';
import Table from './Table';
import '@testing-library/jest-dom/extend-expect';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    }
];

const rows = [
    { id: 1, lastName: 'First name', firstName: 'Last name', age: 35 },
];

test('renders a message', () => { 
    const { getByTestId, getByText } = render(<Table columns={columns} rows={rows} />)
    expect(getByTestId('table')).toBeInTheDocument()
    expect(screen.getByText('First name')).toBeInTheDocument()
    expect(screen.getByText('Last name')).toBeInTheDocument()
})
