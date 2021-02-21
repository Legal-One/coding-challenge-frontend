import Agents, { AgentDocument } from '../models/Agents'

function findAll(): Promise<AgentDocument[]> {
  return Agents.find().exec() // Return a Promise
}

export default {
  findAll,
}
