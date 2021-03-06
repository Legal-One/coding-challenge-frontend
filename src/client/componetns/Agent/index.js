import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Chart from '../Chart'
import Table from '../Table'

import {
  fetchData, getChartData, getTableData, ComponentTypeEnum
} from '../../helpers'

const Agent = ({ match: { params: { ID } }, location: { query: { item } } }) => {
  const [showChart, setShowChart] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  const setView = () => setShowChart(!showChart)

  useEffect(() => {
    fetchData(`/api/agent/${ID}`).then((res) => {
      if (res.error) {
        setError(true)
      } else {
        setData(res.data)
      }
    })
  }, [])

  if (data) {
    const type = ComponentTypeEnum.agent
    if (showChart) {
      const chartData = getChartData(data, type)
      return <Chart setView={setView} data={chartData} title={`Resolutions / ${item}`} homeLink />
    }
    const tableData = getTableData(data, type)
    return <Table setView={setView} data={tableData} endpoint={ComponentTypeEnum.call} homeLink />
  }
  if (error) {
    return <h1>Something went wrong.</h1>
  }
  return <h1>Loading.. please wait!</h1>
}

Agent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      ID: PropTypes.string
    })
  }),
  location: PropTypes.shape({
    query: PropTypes.shape({
      item: PropTypes.string
    })
  })
}

Agent.defaultProps = {
  match: PropTypes.object,
  location: PropTypes.object
};

export default Agent
