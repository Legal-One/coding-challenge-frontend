import React from 'react'
import { getHourAndMinute, getDayMonthYear } from '../../utils'

interface AgentTableRowData {
  number: string
  dateTime: string
  resolution: string
  isLastRow: boolean
}

function AgentTableRow({ number, dateTime, resolution, isLastRow }: AgentTableRowData) {
  const dayMonthYearString = getDayMonthYear(dateTime)
  const hourMinuteString = getHourAndMinute(dateTime)

  return (
    <div className={`columns ${isLastRow ? '' : 'border-bottom'}`}>
      <div className="column">{number}</div>
      <div className="column">{`${dayMonthYearString} ${hourMinuteString}`}</div>
      <div className="column">{resolution}</div>
    </div>
  )
}

export default AgentTableRow
