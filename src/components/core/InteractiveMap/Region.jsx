import Tooltip from '@material-ui/core/Tooltip/Tooltip'
import { useState } from 'react'
import styled from '@emotion/styled'
import { Geography } from 'react-simple-maps'

const StyledGeography = styled(Geography)`
  fill: ${({ selected }) => selected ? '#0f0' : '#fff'};
  stroke: #000;
  outline: none;
  &:hover {
    fill: ${({ selected }) => selected ? '#0f0' : '#eee'};
  }
  &:active {
    fill: #ddd;
  }
`

const Region = ({ geo, selected, clickFactory }) => {
  const [showTooltip, setShowTooltip] = useState(false)

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
        />
      </g>
    </Tooltip>
  )
}

export default Region