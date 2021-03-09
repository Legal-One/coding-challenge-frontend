import React, { useEffect, useState } from 'react'
import Chart from '../Chart'
import { useSelector } from 'react-redux'
import { selectResolutionTypes, selectCallStats } from '../../features/callcenter/callcenter-slice'
import { RootState } from 'src/types'
import { createSelector } from '@reduxjs/toolkit'

function ResolutionGraph() {
  const labels = useSelector(selectResolutionTypes)
  const resolutionData = useSelector(selectCallStats)
  const [data, setData] = useState<Record<string, any>>()

  useEffect(() => {
    const resolutionStats = labels.map((label: string) => {
      return resolutionData[label.replace(/\s/g, '')] ? resolutionData[label.replace(/\s/g, '')] : 0
    })

    const graphData = {
      datasets: [
        {
          data: resolutionStats,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'orange',
            'purple'
          ]
        }
      ],
      labels: labels
    }
    setData(graphData)
  }, [labels, resolutionData])

  return (
    <div className="pt-6 pb-6">
      <h2 className="is-size-3 has-text-weight-bold">Resolution Ratios</h2>
      <Chart
        type="pie"
        options={{ cutoutPercentage: 50 }}
        data={data}
        width="600px"
        height="300px"
      />
    </div>
  )
}

export default ResolutionGraph
