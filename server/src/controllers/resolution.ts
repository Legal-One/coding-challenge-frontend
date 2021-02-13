import { Request, Response, NextFunction } from 'express'

import ResolutionService from '../services/resolution'
import { NotFoundError } from '../helpers/apiError'

// GET /resolutions/:resolutionId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ResolutionService.findById(req.params.resolutionId))
  } catch (error) {
    next(new NotFoundError('Resolution not found', error))
  }
}

// GET /resolutons
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ResolutionService.findAll())
  } catch (error) {
    next(new NotFoundError('Resolution not found', error))
  }
}
