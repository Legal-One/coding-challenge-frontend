import mongoose, { Document } from 'mongoose'

export type AgentDocument = Document & {
  identifier: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

const agentSchema = new mongoose.Schema({
  identifier: {
    type: String,
    index: true,
  },
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
})

export default mongoose.model<AgentDocument>('Agents', agentSchema)
