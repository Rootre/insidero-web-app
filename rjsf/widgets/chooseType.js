import styled from '@emotion/styled'
import Grid from '@material-ui/core/Grid'
import WeekendIcon from '@material-ui/icons/Weekend'
import ApartmentIcon from '@material-ui/icons/Apartment'
import HomeIcon from '@material-ui/icons/Home'
import SelectAllIcon from '@material-ui/icons/SelectAll'
import SvgIcon from '@material-ui/core/SvgIcon'
import { useCenteredFlex } from '@/mui/container'
import { useTheme } from '@material-ui/core'

const ChooseItem = styled.div`
  align-items: middle;
  flex-grow: 1;
  border: 1px solid;
  border-color: ${({color}) => color === 'transparent' ? color : `${color} !important`};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 10px;
  transition: border-color .3s;
  
  &:hover {
    border-color: ${({hoverColor}) => hoverColor};
  }
  
  svg {
    display: block;
  }
`

const iconMap = {
  flat: WeekendIcon,
  house: HomeIcon,
  land: SelectAllIcon,
  commercial: ApartmentIcon,
}

const ChooseType = function (props) {
  const { schema: { enum: enumValues, enumNames }, value } = props
  const classes = useCenteredFlex()
  const {palette: {primary: {main: primaryColor}, text: {secondary: hoverColor}}} = useTheme()

  const handleChangeFactory = value => () => props.onChange(value)

  return (
    <Grid container spacing={2}>
      {enumValues.map((enumValue, index) => {
        const Icon = iconMap.hasOwnProperty(enumValue) ? iconMap[enumValue] : () => {}

        return (
          <Grid key={index} className={classes.root} item xs={6} sm={3} onClick={handleChangeFactory(enumValue)}>
            <ChooseItem hoverColor={hoverColor} color={enumValue === value ? primaryColor : 'transparent'}>
              <SvgIcon component={Icon} color={'primary'} style={{ fontSize: 50 }}/>
              <span>{enumNames[index]}</span>
            </ChooseItem>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ChooseType