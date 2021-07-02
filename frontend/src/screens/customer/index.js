import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getCallDataThunk } from '../../redux-thunk/getCallDataThunk'

import './customer.css'

// import for the atomic and molecular components
import Text from '../../components/atoms/text'
import Badge from '../../components/atoms/badge'
import Table from '../../components/molecules/table'

// import for the utils
import { durationFormatter } from '../../utils/durationFormatter'
import { dateTimeFormatter } from '../../utils/dateTimeFormatter'

function Customer(props) {
  const { number } = useParams()
  const history = useHistory()
  const completeLogData = useSelector((state) => state.completeLogData)

  const selectedNumberData = completeLogData?.filter(
    (eachlog) => eachlog.number === number
  )

  // number table header
  const header = [
    {
      field: 'fullName',
      headerName: 'Agent',
      description: 'Agent Name by whome the last call was made',
      type: 'string',
      flex: 1,
      renderCell: (params) => (
        <span
          onClick={() =>
            history.push({
              pathname: `/agent/${params.row.agentIdentifier}`
            })
          }
          style={{
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          <Text bold size="p1">
            {params.row.firstName || ''} {params.row.lastName || ''}
          </Text>
        </span>
      )
    },
    {
      field: 'resolution',
      headerName: 'Resolution',
      description: 'Resultion status',
      type: 'string',
      width: 200,
      renderCell: (params) => <Badge status={params.row.resolution} />
    },
    {
      field: 'dateTime',
      headerName: 'Call Date Time',
      description: 'Date and Time of the call.',
      type: 'dateTime',
      width: 200,
      renderCell: (params) => (
        <Text size="p1">
          {dateTimeFormatter(params.getValue(params.id, 'dateTime'))}
        </Text>
      )
    },
    {
      field: 'duration',
      headerName: 'Call Duration',
      description: 'Total duration of the call.',
      width: 200,
      renderCell: (params) => (
        <Text size="p1">
          {durationFormatter(params.getValue(params.id, 'duration'))}
        </Text>
      )
    }
  ]

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCallDataThunk(number))
  }, [dispatch, number])

  return (
    <>
      {selectedNumberData && (
        <>
          <div className="customerDetails">
            <Text
              size="p1"
              bold
              primary
              onClick={() =>
                history.push({
                  pathname: '/'
                })
              }
            >
              🠔 Back to DashBoard
            </Text>
            <div style={{ marginTop: '32px' }} />
            <Text primary size="h5">
              Phone Number: {selectedNumberData[0].number}
            </Text>
          </div>
          <div style={{ marginTop: '32px' }} />
          <Table header={header} data={selectedNumberData} />
        </>
      )}
    </>
  )
}

export default Customer
