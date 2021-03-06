import React, { useState, useEffect } from 'react';

import Chart from '../Chart'
import Table from '../Table'

import {
  fetchData, getTableData, getChartData, ComponentTypeEnum
} from '../../helpers'

const Logs = () => {
  const [showChart, setShowChart] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  const setView = () => setShowChart(!showChart)

  useEffect(() => {
    fetchData('/api').then((res) => {
      if (res.error) {
        setError(true)
      } else {
        setData(res.data)
      }
    })
  }, [])

  if (data) {
    const type = ComponentTypeEnum.logs
    if (showChart) {
      const chartData = getChartData(data, type)
      return <Chart setView={setView} data={chartData} title="Calls / Number" homeLink={false} />
    }
    const tableData = getTableData(data, type)
    return <Table setView={setView} data={tableData} endpoint={ComponentTypeEnum.call} homeLink={false} />
  }
  if (error) {
    return <h1>Something went wrong.</h1>
  }
  return <h1>Loading.. please wait!</h1>
}

export default Logs
