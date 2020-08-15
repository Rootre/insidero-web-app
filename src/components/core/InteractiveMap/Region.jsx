import { useState, memo } from 'react'
import Tooltip from '@material-ui/core/Tooltip/Tooltip'
import {useTheme} from '@material-ui/core/styles'
import styled from '@emotion/styled'
import { Geography } from 'react-simple-maps'
import { geoCentroid } from 'd3-geo'

const StyledGeography = styled(Geography)`
  fill: ${({ selected, selectedColor }) => selected ? selectedColor : '#fff'};
  stroke: #000;
  outline: none;
  &:hover {
    fill: ${({ selected, selectedColor }) => selected ? selectedColor : '#eee'};
    stroke-width: 2px;
  }
  &:active {
    fill: #ddd;
  }
`

const Region = ({ geo, selected, clickFactory }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const {palette: {primary: {main: primaryColor}}} = useTheme()

  console.log('geoCentroid', geoCentroid(geo))

  return (
    <Tooltip
      open={showTooltip}
      placement={'top'}
      title={geo.properties.NAME_1}
    >
      <g>
        <StyledGeography
          selected={selected}
          geography={geo}
          onClick={clickFactory(geo)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          selectedColor={primaryColor}
        />
      </g>
    </Tooltip>
  )
}

export default memo(Region)