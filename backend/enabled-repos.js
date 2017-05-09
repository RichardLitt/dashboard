const config = require('./config')

const userIdToDocId = (userId) => {
  return { _id: userId }
}

const enabledReposFromResult = (item) => {
  return item ? item.enabledRepos : []
}

const enableRepo = (db, userId, repoId) => {
  return db.collection(config.databaseName)
    .updateOne(
      userIdToDocId(userId),
      { $addToSet: { enabledRepos: { id: repoId } } }, // Add the repo id to the array if its not in the array already
      { upsert: true } // Add if it doesn't exist, update if it does
    )
    .then(enabledReposFromResult)
}

const disableRepo = (db, userId, repoId) => {
  return db.collection(config.databaseName)
    .updateOne(
      userIdToDocId(userId),
      { $pull: { enabledRepos: { id: repoId } } }, // remove the repo id from the array
      { upsert: true } // Add if it doesn't exist, update if it does
    )
    .then(enabledReposFromResult)
}

const listEnabledRepos = (db, userId) => {
  return db.collection(config.databaseName)
    .findOne(userIdToDocId(userId))
    .then(enabledReposFromResult)
}

module.exports = {
  list: listEnabledRepos,
  enableRepo: enableRepo,
  disableRepo: disableRepo,
}
