const express = require('express')
// const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const config = {
  port: 4001
}

// Enable CORS
app.use(cors())

// REST API
app.get('/:repoId', (req, res) => {
  res.send('user account information' + req.params.repoId)
})
// Start the HTTP server
app.listen(config.port, () => {
  console.log('Backend listening on port', config.port)
})
