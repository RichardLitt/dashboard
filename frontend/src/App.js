import React from 'react'
import Reflux from 'reflux'
import RepositoryStore from './stores/repository-store'
import RepositoryActions from './actions/repository-actions'
import RepositoryList from './components/repository-list'
import './App.css'

class App extends Reflux.Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      enabledRepos: [],
    }
    this.store = RepositoryStore
  }

  componentWillMount () {
    super.componentWillMount()
    RepositoryActions.getRepos()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Welcome to Maintainer.io</h1>
        </div>
        <div className="App-content">
          <h3>User Info:</h3>
          {this.state.name}<br/>
          {this.state.id}<br/>
          <div className="">
            <h3>Repositories:</h3>
            <pre className="App-help">Click the repo to enable / disable to include in Maintainer.io</pre>
            <div className="App-repos">
              <RepositoryList 
                repos={this.state.repos}
                enabledRepos={this.state.enabledRepos}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
