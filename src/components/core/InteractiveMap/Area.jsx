import { useState, memo } from 'react'
import Tooltip from '@material-ui/core/Tooltip/Tooltip'
import {useTheme} from '@material-ui/core/styles'
import styled from '@emotion/styled'
import { Geography } from 'react-simple-maps'

const StyledGeography = styled(Geography)`
  fill: ${({ selected, color }) => selected ? color : '#fff'};
  stroke: #000;
  outline: none;
  &:hover {
    fill: ${({ selected, color }) => selected ? color : '#eee'};
    stroke-width: 2px;
  }
  &:active {
    fill: #ddd;
  }
`

const Area = ({ areaClick, geography, labelKey, projection, selected }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const {palette: {primary: {main: primaryColor}}} = useTheme()

  return (
    <Tooltip
      open={showTooltip}
      placement={'top'}
      title={geography.properties[labelKey]}
    >
      <g>
        <StyledGeography
          selected={selected}
          geography={geography}
          projection={projection}
          onClick={areaClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          color={primaryColor}
        />
      </g>
    </Tooltip>
  )
}

export default memo(Area)