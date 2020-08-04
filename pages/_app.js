// import App from 'next/app'
import { appWithTranslation } from '@/i18n/instance'
import { polyfill } from 'es6-promise'
import 'isomorphic-fetch'

polyfill()

const InsideroApp = ({ Component, pageProps }) => <Component {...pageProps} />

// InsideroApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) })

export default appWithTranslation(InsideroApp)