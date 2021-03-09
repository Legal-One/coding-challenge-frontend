import React, { useEffect, useCallback } from 'react'
import Table from '../Table'
import {
  getCalls,
  selectLoadStatus,
  selectCallDetails
} from '../../features/callcenter/callcenter-slice'
import { useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { LoadStatus } from '../../types'
import ResolutionGraph from '../ResolutionGraph'
import LineGraph from '../LineGraph'
import TableHeader from '../Table/table-header'
import TableRow from '../Table/call-statistics-table-row'

function Home() {
  const tableHeaders = ['Phone number', 'Number of calls', 'Last Spoken Agent', 'Last call time']
  const dispatch = useAppDispatch()

  const getCallData = useCallback(async () => {
    console.log('It is called')
    await dispatch(getCalls())
  }, [dispatch])

  const loadStatus: LoadStatus = useSelector(selectLoadStatus)

  useEffect(() => {
    if (loadStatus === LoadStatus.NOTLOADED) getCallData()
  }, [getCallData, loadStatus])

  const callStats = useSelector(selectCallDetails)

  return (
    <div>
      <h1 className="is-size-2 has-text-weight-bold pt-6 pb-6 has-text-centered">
        Call Details at a Glance
      </h1>
      <div className="container is-flex is-justify-content-space-between">
        <div className="card">
          <span>Total Number of Calls</span>
          <div className="is-size-2 has-text-weight-bold">{callStats.total.calls}</div>
        </div>

        <div className="card">
          <span>Average Call Time</span>
          <div className="is-size-2 has-text-weight-bold">
            {callStats.total.calls > 0 &&
              (callStats.total.duration / callStats.total.calls).toFixed(2)}
            secs
          </div>
        </div>
        <div className="card">
          <span>Unique Numbers Called</span>
          <div className="is-size-2 has-text-weight-bold">{Object.keys(callStats).length - 1}</div>
        </div>
      </div>
      <div className="is-flex is-justify-content-center">
        <ResolutionGraph />
        <LineGraph />
      </div>
      <Table>
        <TableHeader headers={tableHeaders} />
        {Object.keys(callStats).map((key, index) => {
          return (
            key !== 'total' && (
              <TableRow
                key={key}
                {...callStats[key]}
                isLastRow={index === Object.keys(callStats).length - 1}
              />
            )
          )
        })}
      </Table>
    </div>
  )
}

export default Home
