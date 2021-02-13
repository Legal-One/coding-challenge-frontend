import mongoose, { Document } from 'mongoose'

export type ResolutionDocument = Document & {
  identifier: string;
  resolution: string;
}

const ResolutionSchema = new mongoose.Schema({
  identifier: {
    type: String,
    index: true,
  },
  resolution: {
    type: String,
    required: true,
  },
})

export default mongoose.model<ResolutionDocument>(
  'resolution',
  ResolutionSchema
)
