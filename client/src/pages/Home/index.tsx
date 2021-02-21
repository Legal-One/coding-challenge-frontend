import React from 'react'
import { useSelector } from 'react-redux'

import MainTable from '../../components/MainTable'
import { AppState } from '../../Types'

const loadStyle = {
  margin: 'auto',
  width: '50%',
}

const Home = () => {
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
            <MainTable />
          </tbody>
        </table>
      )}
    </>
  )
}

export default Home
