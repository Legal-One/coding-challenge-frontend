import express from 'express'
import path from 'path'
import { Router } from '../utils/interfaces'

export class ViewRouter implements Router {
  app: express.Application

  constructor(app: express.Application) {
    this.app = app
    this.setRoutes()
  }
  setRoutes() {
    this.app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.resolve('index.html'))
    })
  }
}
