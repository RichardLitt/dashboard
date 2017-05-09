const path = require('path')
const MongoClient = require('mongodb').MongoClient
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const Octokat = require('octokat')

const EnabledRepos = require('./enabled-repos')
const config = require('./config')

let database

const getUserId = (req) => {
  // return a hard coded user id until we have users implemented
  return 'ABCDEFG'
}

const handleError = (res, err) => {
  if (res)
    res.status(500).send({ error: err.toString() })
  console.error(err)
}

// Return hardcoded username for now
const getUsername = (req) => 'haadcode'

// Enable CORS
app.use(cors())

// Serve the frontend app and its files
app.use(express.static(config.frontendDirectory))

// REST API
app.get('/repos', (req, res) => {
  const octo = new Octokat()
  octo.users(getUsername(req)).repos
    .fetch()
    .then((repos) => res.json(repos.items))
    .catch(e => handleError(res, e))
})

app.get('/repos/enabled', (req, res) => {
  // console.log("Get enable repos:", getUserId(req))

  const userId = getUserId(req)
  EnabledRepos.list(database, userId)
    .then((repos) => res.json(repos))
    .catch(e => handleError(res, e))
})

app.get('/repos/enable/:id', (req, res) => {
  // console.log("Enable repo:", req.params.id)

  if (!req.params.id || parseInt(req.params.id) === NaN)
    return res.error("Not a valid id: " + req.params.id)

  const userId = getUserId(req)
  const repoId = parseInt(req.params.id)

  EnabledRepos.enableRepo(database, userId, repoId)
    .then(() => EnabledRepos.list(database, userId))
    .then((repos) => res.json(repos))
    .catch(e => handleError(res, e))
})

app.get('/repos/disable/:id', (req, res) => {
  // console.log("Disable repo:", req.params.id)

  if (!req.params.id || parseInt(req.params.id) === NaN)
    return res.error("Not a valid id: " + req.params.id)

  const userId = getUserId(req)
  const repoId = parseInt(req.params.id)

  EnabledRepos.disableRepo(database, userId, repoId)
    .then(() => EnabledRepos.list(database, userId))
    .then((repos) => res.json(repos))
    .catch(handleError)
})

MongoClient.connect(config.mongodbUrl, (err, result) => {
  database = result
  // Start the HTTP server
  app.listen(config.port, () => {
    console.log('Backend listening on port', config.port)
  })
})
