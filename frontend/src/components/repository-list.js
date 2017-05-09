import React from 'react'
import RepositoryActions from '../actions/repository-actions'

const RepositoryList = (props) => {
  const onEnableRepo = (repo) =>  RepositoryActions.enableRepo(repo.id)
  const onDisableRepo = (repo) => RepositoryActions.disableRepo(repo.id)

  let repoList
  let { repos, enabledRepos } = props
  if (repos && enabledRepos) {
    repoList = repos.map((repo, index) => {
      const isEnabled = enabledRepos.find(e => e.id === repo.id)
      const className = 'App-repos-repo'
      const key = "repo_" + index
      
      if (isEnabled)
        return <div className={className} key={key} onClick={e => onDisableRepo(repo)}><b>#{index + 1} {repo.htmlUrl} ENABLED</b><br/></div>
      
      return <div className={className} key={key} onClick={e => onEnableRepo(repo)}>#{index + 1} {repo.htmlUrl}<br/></div>
    })
  }
  return <div>{repoList}</div>
}

export default RepositoryList
