import askGraphQL from '../../helpers/graphQL'

export async function getArticle(articleId, applicationConfig) {
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
  const variables = {
    article: articleId,
    version: '0123456789ab',
    hasVersion: false
  }
  try {
    const data = await askGraphQL(
      { query: query, variables },
      'fetching article with versions',
      null,
      applicationConfig
    )
    return {
      version: data.version,
      article: data.article
    }
  } catch (err) {
    console.log('Something went wrong!', err)
    throw err
  }
}
