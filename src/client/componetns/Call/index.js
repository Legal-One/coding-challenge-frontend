import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Chart from '../Chart'
import Table from '../Table'

import {
  fetchData, getChartData, getTableData, ComponentTypeEnum
} from '../../helpers'

const Call = ({ match: { params: { number } } }) => {
  const [showChart, setShowChart] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)


  const setView = () => setShowChart(!showChart)

  useEffect(() => {
    fetchData(`/api/call/${number}`).then((res) => {
      if (res.error) {
        setError(true)
      } else {
        setData(res.data)
      }
    })
  }, [])

  if (data) {
    const type = ComponentTypeEnum.call
    if (showChart) {
      const chartData = getChartData(data, type)
      return <Chart setView={setView} data={chartData} title={`Resolutions / ${number}`} homeLink />
    }
    const tableData = getTableData(data, type)
    return <Table setView={setView} data={tableData} endpoint={ComponentTypeEnum.agent} homeLink />
  }
  if (error) {
    return <h1>{error.message}</h1>
  }
  return <h1>Loading.. please wait!</h1>
}

Call.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      number: PropTypes.string
    })
  })
}

Call.defaultProps = {
  match: PropTypes.object
};

export default Call
