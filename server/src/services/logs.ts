import Logs, { LogsDocument } from '../models/Logs'

function findById(logId: string): Promise<LogsDocument> {
  return Logs.findById(logId)
    .exec() // .exec() will return a true Promise
    .then((log) => {
      if (!log) {
        throw new Error(`Log ${logId} not found`)
      }
      return log
    })
}

function findAll(): Promise<LogsDocument[]> {
  return Logs.find().exec() // Return a Promise
}

export default {
  findById,
  findAll,
}
