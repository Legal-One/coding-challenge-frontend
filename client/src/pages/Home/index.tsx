import React from 'react'

import Agents from '../../components/Agents'
import { useAgents } from '../../Hooks/useAgents'

const Home = () => {
  const [agentData] = useAgents()
  console.log('agentData', agentData)
  return (
    <div>
      <Agents agents={agentData} />
    </div>
  )
}

export default Home
