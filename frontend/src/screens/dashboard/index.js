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

// import for the utils
import { durationFormatter } from '../../utils/durationFormatter'
import { dateTimeFormatter } from '../../utils/dateTimeFormatter'

function DashBoard() {
  const dispatch = useDispatch()
  const history = useHistory()
  const data = useSelector((state) => state.data)

  // array of all the distinct phone numbers
  const uniqueNumbers = data
    ?.map((eachData) => eachData.number)
    .filter((value, index, self) => self.indexOf(value) === index)

  let finalTableData = uniqueNumbers?.map((number) => {
    // logDataForNumber is the logs With Resolutions And Agents data combined for each phone number
    let logDataForNumber = data?.filter((log) => log.number === number)

    console.log(logDataForNumber)
    // total calls made to a specific number
    let callCount = logDataForNumber.length

    // last call Record is the last value in the array logDataForNumber
    let lastCallRecord = logDataForNumber[callCount - 1]

    return { ...lastCallRecord, callCount } // last call record and call count
  })

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
      field: 'resolution',
      headerName: 'Last Resolution Status',
      description: 'resultion status as per last call',
      type: 'string',
      width: 200,
      renderCell: (params) => <Badge status={params.row.resolution} />
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
          <div className='lottieFile'>
            <Lottie options={LOTTIE_OPTIONS} />
          </div>
        </div>
        <div className="statusCardRoot">
          <div className="statusCardSet">
            <StatusCard
              status="INTERESTED 🚀"
              count={
                finalTableData?.filter(
                  (eachItem) => eachItem.resolution === 'interested'
                ).length || 0
              }
            />
            <StatusCard
              status="NEEDS FOLLOW UP ☕"
              count={
                finalTableData?.filter(
                  (eachItem) => eachItem.resolution === 'needs follow up'
                ).length || 0
              }
            />
          </div>
          <div className="statusCardSet">
            <StatusCard
              status="NEED RESCHEDULE ⏱"
              count={
                finalTableData?.filter(
                  (eachItem) => eachItem.resolution === 'need reschedule'
                ).length || 0
              }
            />
            <StatusCard
              status="NO ANSWER 🤯"
              count={
                finalTableData?.filter(
                  (eachItem) => eachItem.resolution === 'no answer'
                ).length || 0
              }
            />
          </div>
        </div>
      </div>
      <div style={{ padding: '32px' }}></div>
      {finalTableData && <Table header={header} data={finalTableData} />}
    </>
  )
}

export default DashBoard
