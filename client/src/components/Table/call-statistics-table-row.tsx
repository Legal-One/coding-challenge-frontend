import React from 'react'
import { Link } from 'react-router-dom'
import { getHourAndMinute, getDayMonthYear } from '../../utils'
interface CallStatisticsTableRowData {
  number: string
  numberOfCalls: number
  lastCallDate: string
  agentIdentifier: string
  agentName: string
  isLastRow: boolean
}

function CallStatisticsTableRow({
  number,
  numberOfCalls,
  lastCallDate,
  agentIdentifier,
  agentName,
  isLastRow
}: CallStatisticsTableRowData) {
  const callNumber = number.charAt(0) === '+' ? number.slice(1, number.length) : number
  const hourAndMinuteString = getHourAndMinute(lastCallDate)
  return (
    <div className={`columns ${isLastRow ? '' : 'border-bottom'}`}>
      <div className="column">
        <Link to={`/call/${callNumber}`}> {number}</Link>
      </div>
      <div className="column">{numberOfCalls}</div>
      <div className="column">
        <Link to={`/agent/${agentIdentifier}`}>{agentName}</Link>
      </div>
      <div className="column">{hourAndMinuteString}</div>
    </div>
  )
}

export default CallStatisticsTableRow
