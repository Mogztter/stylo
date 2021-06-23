import askGraphQL from "../helpers/graphQL";

export default class ArticleVersionService {

  constructor (applicationConfig) {
    this.applicationConfig = applicationConfig
  }

  async getArticle ({ user, article, version }) {
    let hasVersion
    if (typeof version !== 'string') {
      version = '0123456789ab' // must declare a version even if not used in the query 🤷
      hasVersion = false
    } else {
      hasVersion = true
    }
    const query = `query($article:ID!, $hasVersion: Boolean!, $version:ID!) {
  article(article:$article) {
    _id
    title
    zoteroLink
    owners {
      displayName
    }
    versions {
      _id
      version
      revision
      message
      autosave
      updatedAt
      owner {
        displayName
      }
    }

    live @skip (if: $hasVersion) {
      md
      bib
      yaml
      message
      owner {
        displayName
      }
    }
  }

  version(version: $version) @include (if: $hasVersion) {
    _id
    md
    bib
    yaml
    message
    revision
    version
    owner{
      displayName
    }
  }
}`
    return await askGraphQL(
      { query, variables: { user, article, version, hasVersion } },
      'get article with versions',
      '',
      this.applicationConfig
    )
  }

  async saveVersion (data) {
    const query = `mutation($user: ID!, $article: ID!, $md: String!, $bib: String!, $yaml: String!, $autosave: Boolean!, $major: Boolean!, $message: String) {
  saveVersion(version: {
      article: $article,
      major: $major,
      auto: $autosave,
      md: $md,
      yaml: $yaml,
      bib: $bib,
      message: $message
    },
    user: $user
  ) { 
    _id 
    version
    revision
    message
    autosave
    updatedAt
    owner { 
      displayName
    }
  }
}`
    return await askGraphQL(
      {
        query,
        variables: data,
      },
      'save new article version',
      '',
      this.applicationConfig
    )
  }
}
