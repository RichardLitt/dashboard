const path = require('path')

module.exports = {
  mongodbUrl: 'mongodb://localhost:27017',
  databaseName: 'test',
  frontendDirectory: path.join(__dirname, '../', 'public'),
  port: 4000,
}
