import { getPaginatedPosts } from '@/client/posts'
import Main from './Main'
import { LocaleTypes } from './i18n/settings'

type Props = {
  params: { locale: LocaleTypes }
}; 

export default async function Page({ params: { locale } }: Props) {
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'archive',
  });

  return <Main posts={posts} params={{ locale: locale }} />
}