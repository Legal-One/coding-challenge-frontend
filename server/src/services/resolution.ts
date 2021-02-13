import resolution, { ResolutionDocument } from '../models/Resolution'

function findById(resolutionId: string): Promise<ResolutionDocument> {
  return resolution
    .findById(resolutionId)
    .exec() // .exec() will return a true Promise
    .then((res) => {
      if (!res) {
        throw new Error(`Resolution ${resolutionId} not found`)
      }
      return res
    })
}

function findAll(): Promise<ResolutionDocument[]> {
  return resolution.find().exec() // Return a Promise
}

export default {
  findById,
  findAll,
}
