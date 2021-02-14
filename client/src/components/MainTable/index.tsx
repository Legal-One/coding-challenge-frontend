import React from 'react'

import { MainTableProps } from '../../Types/ui'
import './MainTable.css'

function MainTable({ agent }: MainTableProps) {
  const { firstName, lastName } = agent

  return (
    <table>
      <tbody>
        <tr>
          <th>Phone number</th>
          <th>Number of calls</th>
          <th>Last call details </th>
        </tr>
        <tr>
          <td>49151484522</td>
          <td>3 calls</td>
          <td>
            {firstName} {lastName}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default MainTable
