import Logs, { LogsDocument } from '../models/Logs'

function findAll(): Promise<LogsDocument[]> {
  return Logs.find().exec() // Return a Promise
}

export default {
  findAll,
}
