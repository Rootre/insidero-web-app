import Head from 'next/head'

import SearchForm from '@/components/searchForm/SearchForm'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Homepage | Insidero</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Insidero Web App</h1>
      <p>with docker</p>

      <SearchForm/>
    </div>
  )
}
