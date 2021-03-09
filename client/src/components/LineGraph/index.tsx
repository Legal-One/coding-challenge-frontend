import React, { useEffect, useState, useMemo } from 'react'
import Chart from '../Chart'
import { selectCallPerMonth } from '../../features/callcenter/callcenter-slice'
import { useSelector } from 'react-redux'

function LineGraph() {
  const months = useMemo(
    () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    []
  )
  const callsPerMonth = useSelector(selectCallPerMonth)
  const [data, setData] = useState({})
  useEffect(() => {
    const callsPerMonthData = months.map((month) => callsPerMonth[month])
    const graphData = {
      datasets: [
        {
          data: callsPerMonthData,
          fill: false,
          borderColor: 'aquamarine',
          lineTension: 0,
          label: 'Number of calls'
        }
      ],
      labels: months
    }
    setData(graphData)
  }, [callsPerMonth, months])
  return (
    <div className="pt-6 pb-6">
      <h2 className="is-size-3 has-text-weight-bold">Calls per Month</h2>
      <Chart type="line" options={{}} data={data} width="700px" height="350px" />
    </div>
  )
}

export default LineGraph
