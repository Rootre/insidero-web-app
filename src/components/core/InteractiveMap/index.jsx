import {
  ComposableMap,
  Geographies,
} from 'react-simple-maps'
import Region from './Region'

const url = '/api/topojson'

const InteractiveMap = ({ clickFactory, isSelected, map, projectionConfig }) => {
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={projectionConfig}
      height={500}
    >
      <Geographies geography={`${url}?country=${map}`}>
        {({ geographies }) => geographies.map(geo => (
          <Region
            key={geo.rsmKey}
            geo={geo}
            clickFactory={clickFactory}
            selected={isSelected(geo)}
          />
        ))}
      </Geographies>
    </ComposableMap>
  )
}

export default InteractiveMap