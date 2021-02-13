import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAgents } from '../redux/actions/AgentActions'
import { Agent } from '../Types/AgentType'
import { AppState } from '../Types/'

export const useAgents = () => {
  const [agentData, setAgentData] = useState<Agent[]>([])
  const agents = useSelector((state: AppState) => state.agents.agents)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAgents())
  }, [dispatch])

  useEffect(() => {
    setAgentData(agents)
  }, [agents])
  console.log('agents hooks', agentData)
  return [agentData]
}
