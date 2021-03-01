import env from 'dotenv'
import http from 'http'
import App from './app'
import { createServiceContainer } from './service-container'

async function init() {
  env.config()

  const port = process.env.PORT || 5000
  const host = process.env.HOST || 'localhost'
  const app = new App()
  try {
    console.log('Starting server...')
    const server = http.createServer(app.instance)
    const serviceContainer = createServiceContainer()
    app.configureApp(serviceContainer)
    server.listen({ host: host, port: port }, () =>
      console.log(`Server listening at localhost on port 5000`)
    )
  } catch (err) {
    console.log(err)
  }
}

init()
