import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import mongoose from 'mongoose'
import bluebird from 'bluebird'

import { MONGODB_URI } from './util/secrets'

import agentRouter from './routers/agents'
import logsRouter from './routers/logs'
import resolutionRouter from './routers/resolution'

import apiErrorHandler from './middlewares/apiErrorHandler'

const app = express()
const mongoUrl = MONGODB_URI

mongoose.Promise = bluebird
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('database connected')
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

app.set('port', process.env.PORT || 8000)
//common 3rd-party middlewares
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

//routers
app.use('/api/v1/resolution', resolutionRouter)
app.use('/api/v1/agent', agentRouter)
app.use('/api/v1/logs', logsRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
