import React, { useEffect } from 'react'
import Lottie from 'react-lottie'
import { getDashboardDataThunk } from '../../redux-thunk/getDashboardDataThunk'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './dashboard.css'
import CallSupportAnimation from '../../assets/call.json'

// import for the atomic and molecular components
import Text from '../../components/atoms/text'
import Badge from '../../components/atoms/badge'
import StatusCard from '../../components/molecules/statusCards'
import Table from '../../components/molecules/table'
import Chart from '../../components/molecules/chart'

// import for the utils
import { durationFormatter } from '../../utils/durationFormatter'
import { dateTimeFormatter } from '../../utils/dateTimeFormatter'

function DashBoard() {
  const dispatch = useDispatch()
  const history = useHistory()
  const dashboardTableData = useSelector((state) => state.dashboardTableData)

  // dashboard table header
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
      field: 'callCount',
      headerName: 'Number of calls',
      width: 200,
      type: 'string',
      renderCell: (params) => (
        <Text size="p1">
          {params.row.callCount}
          {params.row.callCount > 1 ? ' calls' : ' call'}
        </Text>
      )
    },
    {
      field: 'resolution',
      headerName: 'Last Resolution',
      description: 'resultion status as per last call',
      type: 'string',
      width: 200,
      renderCell: (params) => <Badge status={params.row.resolution} />
    },
    {
      field: 'fullName',
      headerName: 'Agent',
      description: 'Agent Name by whome the last call was made',
      type: 'string',
      width: 200,
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
      field: 'dateTime',
      headerName: 'Last Called On',
      description: 'Date and Time of the last call.',
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
      headerName: 'Last Call Duration',
      description: 'Total duration of the last call.',
      width: 200,
      renderCell: (params) => (
        <Text size="p1">
          {durationFormatter(params.getValue(params.id, 'duration'))}
        </Text>
      )
    }
  ]

  const LOTTIE_OPTIONS = {
    loop: true,
    autoplay: true,
    animationData: CallSupportAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  useEffect(() => {
    dispatch(getDashboardDataThunk())
  }, [dispatch])

  return (
    <>
      <div className="dashboard">
        <div className="intro">
          <div>
            <Text size="h1" primary bold>
              The Dashboard for
            </Text>
            <Text size="h1" primary bold>
              Call Records
            </Text>
            <div className="subheading">
              <Text size="p1" primary>
                A call center makes tons of calls daily through call center
                agents and these calls are dumped in JSON files. We need you to
                handle this large amount of data, and present it in a nice way
                for the supervisors.
              </Text>
              <br />
              <Text size="p1" primary>
                The issue with the data is the structure, it is spread across
                multiple files. We need your mind to solve this issue and
                present the data in a useful way.
              </Text>
            </div>
          </div>
          <div className="lottieFile">
            <Lottie options={LOTTIE_OPTIONS} />
          </div>
        </div>
        {dashboardTableData && (
          <div className="statusCardRoot">
            <div className="statusCardSet">
              <StatusCard
                status="INTERESTED 🚀"
                count={
                  dashboardTableData?.filter(
                    (eachItem) => eachItem.resolution === 'interested'
                  ).length || 0
                }
              />
              <StatusCard
                status="NEEDS FOLLOW UP ☕"
                count={
                  dashboardTableData?.filter(
                    (eachItem) => eachItem.resolution === 'needs follow up'
                  ).length || 0
                }
              />
            </div>
            <div className="statusCardSet">
              <StatusCard
                status="NEED RESCHEDULE ⏱"
                count={
                  dashboardTableData?.filter(
                    (eachItem) => eachItem.resolution === 'need reschedule'
                  ).length || 0
                }
              />
              <StatusCard
                status="NO ANSWER 🤯"
                count={
                  dashboardTableData?.filter(
                    (eachItem) => eachItem.resolution === 'no answer'
                  ).length || 0
                }
              />
            </div>
            <div className="statusCardSet">
              <StatusCard
                status="Total Customers 💯"
                count={dashboardTableData.length || 0}
              />
              <StatusCard
                status="Total Calls 📞"
                count={
                  dashboardTableData
                    ?.map((eachItem) => eachItem.callCount)
                    .reduce((prev, next) => prev + next) || 0
                }
              />
            </div>
          </div>
        )}
        <div style={{ marginTop: '32px' }} />
        <Text size="p1" primary>
          Percentage of each current resolution status for the numbers 👇
        </Text>
        <br />

        {dashboardTableData && (
          <Chart
            // Chart data {color, text, percentage}
            data={[
              {
                color: '#434343',
                text: 'interested',
                percentage:
                  (dashboardTableData?.filter(
                    (eachItem) => eachItem.resolution === 'interested'
                  ).length /
                    dashboardTableData.length) *
                  100
              },
              {
                color: '#656565',
                text: 'needs follow up',
                percentage:
                  (dashboardTableData?.filter(
                    (eachItem) => eachItem.resolution === 'needs follow up'
                  ).length /
                    dashboardTableData.length) *
                  100
              },
              {
                color: '#878787',
                text: 'need reschedule',
                percentage:
                  (dashboardTableData?.filter(
                    (eachItem) => eachItem.resolution === 'need reschedule'
                  ).length /
                    dashboardTableData.length) *
                  100
              },
              {
                color: '#a9a9a9',
                text: 'no answer',
                percentage:
                  (dashboardTableData?.filter(
                    (eachItem) => eachItem.resolution === 'no answer'
                  ).length /
                    dashboardTableData.length) *
                  100
              }
            ]}
          />
        )}
      </div>
      <div style={{ marginTop: '32px' }} />
      {dashboardTableData && (
        <Table header={header} data={dashboardTableData} />
      )}
    </>
  )
}

export default DashBoard
