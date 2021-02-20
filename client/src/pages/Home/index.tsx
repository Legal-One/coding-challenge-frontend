import React from 'react'
import { useSelector } from 'react-redux'

import { LogProps } from '../../Types/ui'
import MainTable from '../../components/MainTable'
import { AppState } from '../../Types'

const loadStyle = {
  margin: 'auto',
  width: '50%',
}

const Home = ({ logs }: LogProps) => {
  const loading = useSelector((state: AppState) => state.logs.loading)

  return (
    <>
      {loading ? (
        <h1 style={loadStyle}>Loading...</h1>
      ) : (
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
      )}
    </>
  )
}

export default Home
