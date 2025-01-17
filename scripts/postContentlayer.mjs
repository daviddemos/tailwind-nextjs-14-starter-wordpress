/* workaround script for windows users only, see there : https://github.com/timlrx/tailwind-nextjs-starter-blog/issues/704 
command : node ./scripts/postContentlayer.mjs */
import { writeFileSync } from 'fs'
import GithubSlugger from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import siteMetadata from '../data/siteMetadata.js'
import { fallbackLng, secondLng } from '../app/[locale]/i18n/locales.js'

const isProduction = process.env.NODE_ENV === 'production'

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
export async function createTagCount() {
  const tagCount = {
    [fallbackLng]: {},
    [secondLng]: {},
  }

  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag)
        if (file.language === fallbackLng) {
          tagCount[fallbackLng][formattedTag] = (tagCount[fallbackLng][formattedTag] || 0) + 1
        } else if (file.language === secondLng) {
          tagCount[secondLng][formattedTag] = (tagCount[secondLng][formattedTag] || 0) + 1
        }
      })
    }
  })

  writeFileSync('./app/[locale]/tag-data.json', JSON.stringify(tagCount))
}

export async function createSearchIndex() {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    )
    console.log('Local search index generated...')
  }
}

async function postContentlayer() {
  await createTagCount()
  await createSearchIndex()
}

postContentlayer()
