import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getAgentDataThunk } from '../../redux-thunk/getAgentDataThunk'

import './agent.css'

// import for the atomic and molecular components
import Text from '../../components/atoms/text'
import Badge from '../../components/atoms/badge'
import Table from '../../components/molecules/table'
import StatusCard from '../../components/molecules/statusCards'
import Chart from '../../components/molecules/chart'

// import for the utils
import { dateTimeFormatter } from '../../utils/dateTimeFormatter'
import { durationFormatter } from '../../utils/durationFormatter'

function Agent(props) {
  const { id } = useParams()
  const history = useHistory()
  const completeLogData = useSelector((state) => state.completeLogData)
  const selectedAgentData = completeLogData?.filter(
    (eachlog) => eachlog.agentIdentifier === id
  )

  // agent table header
  const header = [
    {
      field: 'number',
      headerName: 'Phone Number',
      description: 'Customer Phone Number',
      type: 'string',
      flex: 1,
      renderCell: (params) => (
        <span
          onClick={() =>
            history.push({
              pathname: `/call/${params.row.number}`
            })
          }
          style={{
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          <Text bold size="p1">
            {params.row.number}
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
    dispatch(getAgentDataThunk(id))
  }, [dispatch, id])

  return (
    <>
      {selectedAgentData && (
        <div className="agentDetails">
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
          <img
            className="agentImage"
            alt={selectedAgentData[0].firstName}
            src={selectedAgentData[0].photo}
          />
          <Text primary size="h2" bold>
            {selectedAgentData[0].firstName || ''}{' '}
            {selectedAgentData[0].lastName || ''}
          </Text>
          <a className="link" href={`mailto:${selectedAgentData[0].email}`}>
            <Text primary size="p1">
              {selectedAgentData[0].email || ''}
            </Text>
          </a>
          <StatusCard
            status="Total Calls 📞"
            count={selectedAgentData.length || 0}
          />
          <div style={{ marginTop: '32px' }} />
        <Text size="p1" primary>
          Percentage of resolution for all the call logs by the agent 👇
        </Text>
        <br/>
        <Chart
          // Chart data {color, text, percentage}
          data={[
            {
              color: '#434343',
              text: 'interested',
              percentage:
                (selectedAgentData?.filter(
                  (eachItem) => eachItem.resolution === 'interested'
                ).length /
                  selectedAgentData.length) *
                100
            },
            {
              color: '#656565',
              text: 'needs follow up',
              percentage:
                (selectedAgentData?.filter(
                  (eachItem) => eachItem.resolution === 'needs follow up'
                ).length /
                  selectedAgentData.length) *
                100
            },
            {
              color: '#878787',
              text: 'need reschedule',
              percentage:
                (selectedAgentData?.filter(
                  (eachItem) => eachItem.resolution === 'need reschedule'
                ).length /
                  selectedAgentData.length) *
                100
            },
            {
              color: '#a9a9a9',
              text: 'no answer',
              percentage:
                (selectedAgentData?.filter(
                  (eachItem) => eachItem.resolution === 'no answer'
                ).length /
                  selectedAgentData.length) *
                100
            }
          ]}
        />
        </div>
      )}
      {selectedAgentData && <Table header={header} data={selectedAgentData} />}
    </>
  )
}

export default Agent
