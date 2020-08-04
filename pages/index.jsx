import Head from 'next/head'

import { withTranslation } from '@/i18n/instance'

import SearchForm from '@/components/searchForm/SearchForm'
import LanguageSwitcher from '@/components/header/LanguageSwitcher'

function Home({ t }) {
  return (
    <div>
      <Head>
        <title>Homepage | Insidero</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LanguageSwitcher/>

      <h1>{t('h1')}</h1>

      <SearchForm/>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      namespacesRequired: ['common', 'searchForm'],
    },
  }
}

export default withTranslation('common')(Home)