import mongoose, { Document } from 'mongoose'

export type LogsDocument = Document & {
  identifier: string;
  agentIdentifier: string;
  number: string;
  dateTime: string;
  duration: number;
}

const logsSchema = new mongoose.Schema({
  identifier: {
    type: String,
    index: true,
  },
  agentIdentifier: {
    type: String,
    required: true,
  },

  number: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
  },
})

export default mongoose.model<LogsDocument>('Logs', logsSchema)
