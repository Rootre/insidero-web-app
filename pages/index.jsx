import Head from 'next/head'

import { withTranslation } from '@/i18n/instance'

import LanguageSwitcher from '@/components/header/LanguageSwitcher'
import { listCountry, listRegion } from '@/consts/urls'
import { CodeLists } from '@/contexts/codeLists'
import SearchFormContainer
  from '@/features/SearchForm/containers/SearchFormContainer'

function Home ({ countries, regions, t }) {
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

      <SearchFormContainer/>
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

  return {
    props: {
      namespacesRequired: ['common', 'searchForm'],
      countries,
      regions,
    },
  }
}

export default withTranslation('common')(Home)