import { Request, Response, NextFunction } from 'express'

import LogService from '../services/logs'
import { NotFoundError } from '../helpers/apiError'

// GET /logs
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await LogService.findAll())
  } catch (error) {
    next(new NotFoundError('Logs not found', error))
  }
}
