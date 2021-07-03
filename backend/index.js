const express = require('express')
const routes = require('./routes')
const cors = require('cors')

// intialization of express server setup
const app = express()
app.use(cors({ origin: true }))
app.use(express.json())
app.use('/', routes)

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log('App is listening on port ' + listener.address().port)
})
