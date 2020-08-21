import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import { i18n, withTranslation } from '@/i18n/instance'

const langs = {
  cs: 'Čeština',
  en: 'English',
}

function LanguageSwitcher () {
  return (
    <ButtonGroup style={{float: 'right'}} variant={'contained'} orientation={'vertical'}>
      {Object.keys(langs).map(lang => (
        <Button
          key={lang}
          size={'small'}
          onClick={() => i18n.changeLanguage(lang)}
        >
          {langs[lang]}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default withTranslation('common')(LanguageSwitcher)