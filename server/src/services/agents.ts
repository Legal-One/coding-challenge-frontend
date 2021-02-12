import Agents, { AgentDocument } from '../models/Agents'

function findById(agentId: string): Promise<AgentDocument> {
  return Agents.findById(agentId)
    .exec() // .exec() will return a true Promise
    .then((agent) => {
      if (!agent) {
        throw new Error(`Agent ${agentId} not found`)
      }
      return agent
    })
}

function findAll(): Promise<AgentDocument[]> {
  return Agents.find().exec() // Return a Promise
}

export default {
  findById,
  findAll,
}
