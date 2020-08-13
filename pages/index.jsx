import Head from 'next/head'

import { withTranslation } from '@/i18n/instance'

import SearchForm from '@/components/searchForm/SearchForm'
import LanguageSwitcher from '@/components/header/LanguageSwitcher'
import { listCountry, listRegion } from '@/consts/urls'
import { CountryList, RegionList } from '@/contexts/codeLists'

function Home ({ countries, regions, t }) {
  return (
    <CountryList.Provider value={countries}>
      <RegionList.Provider value={regions}>
        <Head>
          <title>Homepage | Insidero</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <LanguageSwitcher/>

        <h1>{t('h1')}</h1>

        <SearchForm/>
      </RegionList.Provider>
    </CountryList.Provider>
  )
}

export async function getStaticProps (context) {
  const countries = await fetch(listCountry)
  .then(data => data.json())
  .then(data => Object.values(data.results))
  .catch(err => err.message)

  const regions = await fetch(listRegion)
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