import React from 'react'

import MainTable from '../../components/MainTable'

const Home = ({ res, logs, agents }: any) => {
  return (
    <div>
      <MainTable agents={agents} res={res} logs={logs} />
    </div>
  )
}

export default Home
