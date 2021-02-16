import React from 'react'

import { LogProps } from '../../Types/ui'
import MainTable from '../../components/MainTable'

const Home = ({ logs }: LogProps) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Phone number</th>
          <th>Number of calls</th>
          <th>Last call details </th>
        </tr>
      </tbody>
      <tbody>
        <MainTable logs={logs} />
      </tbody>
    </table>
  )
}

export default Home
