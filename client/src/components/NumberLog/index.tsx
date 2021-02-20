import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { AppState } from '../../Types'
import { ParamsProps } from '../../Types/ui'

function NumberLog() {
  const { identifier } = useParams<ParamsProps>()

  const CurrentLog = useSelector((state: any) =>
    state.logs.logs.find((log) => log.identifier === identifier)
  )

  const resolution = useSelector((state: AppState) =>
    state.resolution.resolution.find(
      (res) => res?.identifier === CurrentLog?.identifier
    )
  )

  const date = new Date(CurrentLog?.dateTime)
    .toLocaleString('en-GB')
    .replace(',', '')

  return (
    <table>
      <tbody>
        <tr>
          <th>Phone number</th>
          <th>Call date and time</th>
          <th>Resolution</th>
        </tr>
        <tr>
          <td>{CurrentLog.number}</td>
          <td>{date}</td>
          <td>{resolution.resolution}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default NumberLog
