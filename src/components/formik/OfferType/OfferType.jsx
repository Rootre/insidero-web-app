import styled from '@emotion/styled'
import Grid from '@material-ui/core/Grid'
import WeekendIcon from '@material-ui/icons/Weekend'
import ApartmentIcon from '@material-ui/icons/Apartment'
import HomeIcon from '@material-ui/icons/Home'
import SelectAllIcon from '@material-ui/icons/SelectAll'
import SvgIcon from '@material-ui/core/SvgIcon'
import { useCenteredFlex } from '@/mui/container'
import { useTheme } from '@material-ui/core'

import { withTranslation } from '@/i18n/instance'

const ChooseItem = styled.div`
  align-items: middle;
  flex-grow: 1;
  border: 1px solid;
  border-color: ${({ color }) => color === 'transparent'
  ? color
  : `${color} !important`};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 10px;
  transition: border-color .3s;
  
  &:hover {
    border-color: ${({ hoverColor }) => hoverColor};
  }
  
  span {
    flex-basis: 100%;
    text-align: center;
  }
`

const options = [
  {
    icon: WeekendIcon,
    getLabel: t => t('typeFlat'),
    value: 'flat',
  },
  {
    icon: HomeIcon,
    getLabel: t => t('typeHouse'),
    value: 'house',
  },
  {
    icon: SelectAllIcon,
    getLabel: t => t('typeLand'),
    value: 'land',
  },
  {
    icon: ApartmentIcon,
    getLabel: t => t('typeCommercial'),
    value: 'commercial',
  },
]
const name = 'type'

const OfferType = function ({ formik, t }) {
  const {handleChange, values} = formik
  const classes = useCenteredFlex()
  const { palette: { primary: { main: primaryColor }, text: { secondary: hoverColor } } } = useTheme()

  const handleChangeFactory = value => () => handleChange({target: {name, value}})

  return (
    <Grid container spacing={2}>
      {options.map(({icon: Icon, getLabel, value}, index) => {
        return (
          <Grid key={index} className={classes.root} item xs={6} sm={3}
                onClick={handleChangeFactory(value)}>
            <ChooseItem hoverColor={hoverColor} color={value === values[name]
              ? primaryColor
              : 'transparent'}>
              <SvgIcon component={Icon} color={'primary'} style={{ fontSize: 50 }}/>
              <span>{getLabel(t)}</span>
            </ChooseItem>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default withTranslation('searchForm')(OfferType)