import React from 'react'

import Table from '../components/molecules/table'

export default {
  title: 'Legal One Coding Challenge Design System/Molecules/Table',
  component: Table
}

const Template = (args) => <Table {...args} />

export const NoData = Template.bind({})
NoData.args = {
  header: [
    { field: 'id', headerName: 'ID', width: 200 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 200
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 200,
      editable: false
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 200,
      editable: false
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
      renderCell: (params) => {
        return (
          <span
            onClick={() => console.log(`/agent/test`)}
            style={{ cursor: 'pointer' }}
          >
            cool
          </span>
        )
      }
    }
  ],
  data: []
}

export const SampleData = Template.bind({})
SampleData.args = {
  header: [
    { field: 'id', headerName: 'ID', width: 200 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 200
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 200,
      editable: false
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 200,
      editable: false
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
      renderCell: (params) => {
        return (
          <span
            onClick={() => console.log(`/agent/hi`)}
            style={{ cursor: 'pointer' }}
          >
            {' '}
            cool
          </span>
        )
      }
    }
  ],
  data: [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
  ]
}
