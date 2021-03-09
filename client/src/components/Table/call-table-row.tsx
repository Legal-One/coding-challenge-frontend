import React from 'react'
import { getHourAndMinute, getDayMonthYear } from '../../utils'
interface CallTableRowData {
  agentName: string
  dateTime: string
  resolution: string
  isLastRow: boolean
}

function CallTableRowData({ agentName, dateTime, resolution, isLastRow }: CallTableRowData) {
  const hourMinuteString = getHourAndMinute(dateTime)
  const dayMonthYearString = getDayMonthYear(dateTime)
  return (
    <div className={`columns ${isLastRow ? '' : 'border-bottom'}`}>
      <div className="column">{agentName}</div>
      <div className="column">{`${dayMonthYearString} ${hourMinuteString}`}</div>
      <div className="column">{resolution}</div>
    </div>
  )
}

export default CallTableRowData
