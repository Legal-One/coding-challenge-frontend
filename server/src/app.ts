import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { ServiceContainer } from './service-container'

import { CallCenterRouter } from './call-center/callcenter-router'
import path from 'path'
import { ViewRouter } from './view/view-router'

class App {
  instance: express.Application

  constructor() {
    this.instance = express()
  }

  private setRoutes(serviceContainer: ServiceContainer): void {
    const callRouter = new CallCenterRouter(this.instance, serviceContainer)
    const viewRouter = new ViewRouter(this.instance)
  }

  configureApp(serviceContainer: ServiceContainer): void {
    this.instance.use(helmet())
    this.instance.use(express.urlencoded({ extended: true }))
    this.instance.use(express.json())
    this.instance.use(cors<express.Request>())
    this.instance.use(
      express.static(path.join(__dirname, '../../client/client-build'))
    )
    this.setRoutes(serviceContainer)
  }
}

export default App
