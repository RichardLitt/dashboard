import Reflux from 'reflux'
import RepositoryActions from '../actions/repository-actions'

const initialUserData = {
  id: null,
  name: 'haadcode',
  email: null,
  repos: [],
  enabledRepos: [],
}

class RepositoryStore extends Reflux.Store {
  constructor() {
    super()
    this.state = initialUserData
    this.listenTo(RepositoryActions.getRepos, this.onGetRepositories)
    this.listenTo(RepositoryActions.enableRepo, this.onEnableRepository)
    this.listenTo(RepositoryActions.disableRepo, this.onDisableRepository)
  }

  onGetRepositories () {
    let newState = {}
    fetch('http://localhost:4000/repos', { mode: ' no-cors' })
      .then((response) => response.json())
      .then((allRepos) => Object.assign(newState, { repos: allRepos }))
      .then(() => fetch('http://localhost:4000/repos/enabled', { mode: ' no-cors' }))
      .then((response) => response.json())
      .then((enabledRepos) => Object.assign(newState, { enabledRepos: enabledRepos }))
      .then(() => this.setState(newState))
      .catch(e => console.error(e))
  }

  onEnableRepository (repoId) {
    fetch('http://localhost:4000/repos/enable/' + repoId, { mode: ' no-cors' })
      .then((response) => response.json())
      .then((enabledRepos) => {
        this.setState({ enabledRepos: enabledRepos })
      })
      .catch(e => console.error(e))
  }

  onDisableRepository (repoId) {
    fetch('http://localhost:4000/repos/disable/' + repoId, { mode: ' no-cors' })
      .then((response) => response.json())
      .then((enabledRepos) => {
        this.setState({ enabledRepos: enabledRepos })
      })
      .catch(e => console.error(e))
  }
}

export default RepositoryStore
