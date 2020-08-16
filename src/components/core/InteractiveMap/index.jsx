import { memo } from 'react'
import { ComposableMap, Geographies, Marker } from 'react-simple-maps'
import Area from './Area'
import { geoCentroid } from 'd3-geo'
import { useQuery } from 'react-query'
import Loader from '@/components/core/Loader'

const url = '/api/topojson'
const getMap = map => async () => {
  const result = await fetch(`${url}?country=${map}`)
  const data = await result.json()

  if (!result.ok) {
    throw new Error(data.error)
  }

  return data
}

const InteractiveMap = ({ areaClick, width = 800, height = 500, isSelected, labelKey = 'NAME_1', map, projectionConfig }) => {
  // TODO: optimize re-renders
  // TODO: optimize maps to be more lightweight
  const {
    isError,
    data,
    error,
    isFetching,
  } = useQuery(map, getMap(map))

  if (isFetching) {
    return <Loader style={{ paddingTop: `${(height / width) * 100}%` }}/>
  }
  if (isError) {
    return <p>Error: {error}</p>
  }

  const handleAreaClick = geo => e => areaClick(geo)

  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={projectionConfig}
      height={height}
      width={width}
    >
      <Geographies geography={data}>
        {({ geographies }) => geographies.map((geography, projection) => {
          const centroid = geoCentroid(geography)

          return (
            <g key={geography.rsmKey}>
              <Area
                geography={geography}
                labelKey={labelKey}
                projection={projection}
                areaClick={handleAreaClick(geography)}
                selected={isSelected(geography)}
              />
              <Marker coordinates={centroid}>
                <text fontSize={14} textAnchor="middle"
                      style={{ pointerEvents: 'none' }}>
                  {geography.properties[labelKey]}
                </text>
              </Marker>
            </g>
          )
        })}
      </Geographies>
    </ComposableMap>
  )
}

export default memo(InteractiveMap)