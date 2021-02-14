import React from 'react'

import { useAgents } from '../../Hooks/useAgents'
import MainTable from '../../components/MainTable'
const Home = () => {
  const [agentData] = useAgents()

  return (
    <div>
      {agentData &&
        agentData.map((agents) => <MainTable key={agents._id} agent={agents} />)}
    </div>
  )
}

export default Home
