import React from 'react'

import MainTable from '../../components/MainTable'

const Home = ({ res, logs, agents }: any) => {
  return (
    <table>
      <tr>
        <th>Phone number</th>
        <th>Number of calls</th>
        <th>Last call details </th>
      </tr>
      <tbody>
        <MainTable agents={agents} res={res} logs={logs} />
      </tbody>
    </table>
  )
}

export default Home
