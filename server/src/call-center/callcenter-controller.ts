import express from 'express'
import { httpHeader, statusCode } from '../utils/http-header'
import { CallCenterServiceInterface } from './callcenter-service'

export interface CallCenterControllerInterface {
  getCallCenterData(req: express.Request, res: express.Response): void
}

export default class CallCenterController {
  callService: CallCenterServiceInterface
  constructor(callService: CallCenterServiceInterface) {
    this.callService = callService
  }
  async getCallCenterData(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const [calls, agents, resolutions] = await Promise.all([
        this.callService.getCalls(),
        this.callService.getAgents(),
        this.callService.getResolutions()
      ])
      res.set(httpHeader.json).status(statusCode.success).send({
        success: true,
        calls: calls.data,
        agents: agents.data,
        resolutions: resolutions.data
      })
    } catch (err) {
      console.log(err)
      res
        .set(httpHeader.json)
        .status(statusCode.internalError)
        .send({
          response: {
            success: false,
            error: err.errorMessage
          }
        })
    }
  }
}
