import CallCenterController, {
  CallCenterControllerInterface
} from './callcenter-controller'
import express from 'express'
import { Router } from '../utils/interfaces'
import { ServiceContainer } from '../service-container'

export class CallCenterRouter implements Router {
  app: express.Application
  callCenterController: CallCenterControllerInterface
  constructor(app: express.Application, serviceContainer: ServiceContainer) {
    this.app = app
    this.callCenterController = new CallCenterController(
      serviceContainer.callcenter.service
    )
    this.setRoutes()
  }
  setRoutes() {
    this.app.get(
      '/api/v1/calls/',
      (req: express.Request, res: express.Response) =>
        this.callCenterController.getCallCenterData(req, res)
    )
  }
}
