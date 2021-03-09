import React, { useEffect, useRef } from 'react'
import { Chart as ChartJs } from 'chart.js'

function Chart({
  type,
  options,
  data,
  width,
  height
}: {
  type: string
  options: Record<string, any>
  data: Record<string, any>
  width: string
  height: string
}) {
  const canvasElement = useRef(null)

  const firstRender = useRef(true)
  useEffect(() => {
    const config = {
      type: type,
      data,
      options
    }
    if (!firstRender.current) {
      canvasElement.current.data.datasets = data.datasets
      canvasElement.current.data.labels = data.labels
      canvasElement.current.update()
    } else {
      const context = canvasElement.current.getContext('2d')
      canvasElement.current = new ChartJs(context, config)
      firstRender.current = false
    }
  }, [type, options, data])

  return <canvas width={width} height={height} ref={canvasElement}></canvas>
}

export default Chart
