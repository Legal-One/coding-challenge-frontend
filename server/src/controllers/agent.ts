import { Request, Response, NextFunction } from 'express'

import AgentService from '../services/agents'
import { NotFoundError } from '../helpers/apiError'

// GET /agents/:agentId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AgentService.findById(req.params.agentId))
  } catch (error) {
    next(new NotFoundError('Agent not found', error))
  }
}

// GET /agents
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AgentService.findAll())
  } catch (error) {
    next(new NotFoundError('Agents not found', error))
  }
}
