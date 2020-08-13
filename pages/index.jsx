import Head from 'next/head'

import { withTranslation } from '@/i18n/instance'

import SearchForm from '@/components/searchForm/SearchForm'
import LanguageSwitcher from '@/components/header/LanguageSwitcher'
import { listCountry, listNeighborhood, listRegion } from '@/consts/urls'
import { CodeLists } from '@/contexts/codeLists'
import parseNeighborhoods from '@/utils/parseNeighborhoods'

function Home ({ countries, neighborhoods, regions, t }) {
  return (
    <CodeLists.Provider value={{
      countries,
      regions,
    }}>
      <Head>
        <title>Homepage | Insidero</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <LanguageSwitcher/>

      <h1>{t('h1')}</h1>

      <SearchForm/>
    </CodeLists.Provider>
  )
}

export async function getStaticProps (context) {
  const countries = await fetch(listCountry)
  .then(data => data.json())
  .then(data => Object.values(data.results))
  .catch(err => err.message)

  const regions = await fetch(`${listRegion}?limit=250`)
  .then(data => data.json())
  .then(data => Object.values(data.results))
  .catch(err => err.message)

  const neighborhoods = await fetch(listNeighborhood)
  .then(data => data.json())
  .then(data => Object.values(data.results))
  .catch(err => err.message)

  return {
    props: {
      namespacesRequired: ['common', 'searchForm'],
      countries,
      neighborhoods: parseNeighborhoods(neighborhoods),
      regions,
    },
  }
}

export default withTranslation('common')(Home)