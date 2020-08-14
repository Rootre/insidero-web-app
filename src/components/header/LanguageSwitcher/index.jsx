import styled from '@emotion/styled'
import { i18n, withTranslation } from '@/i18n/instance'

const List = styled.ul`
  float: right;
  list-style: none;
`

const langs = {
  cs: 'Čeština',
  en: 'English',
}

function LanguageSwitcher () {
  return (
    <List>
      {Object.keys(langs).map(lang => (
        <li key={lang}>
          <button
            onClick={() => i18n.changeLanguage(lang)}
          >
            {langs[lang]}
          </button>
        </li>
      ))}
    </List>
  )
}

export default withTranslation('common')(LanguageSwitcher)