import SvgIcon from '@material-ui/core/SvgIcon'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import styled from '@emotion/styled'
import { withTranslation } from '@/i18n/instance'

const AmenitiesWrapper = styled.ul`
  display: flex;
  flex-flow: col wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`

const Amenities = ({ amenities, t }) => {
  return (
    <AmenitiesWrapper>
      {amenities.basement && <AmenitiesItem text={t('basement')}/>}
      {amenities.condition && <AmenitiesItem text={t(amenities.condition)}/>}
      {amenities.material && <AmenitiesItem text={t(amenities.material)}/>}
      {amenities.gas && <AmenitiesItem text={t('gas')}/>}
    </AmenitiesWrapper>
  )
}

const AmenitiesItem = ({ text }) => {
  return (
    <li style={{marginRight: 16}}>
      <SvgIcon style={{fontSize: 16, verticalAlign: 'text-bottom', marginRight: 6}} color={'secondary'} component={FiberManualRecordIcon}/>
      {text}
    </li>
  )
}

export default withTranslation('amenities')(Amenities)