import InteractiveMap from '@/components/core/InteractiveMap'
import getInteractiveMapProps from '@/utils/getInteractiveMapProps'
import { useContext, useState } from 'react'
import { CodeLists } from '@/contexts/codeLists'
import Select from '@/components/mui/Select'

/**
 * With fallback to selectbox
 * @param props
 * @return {*}
 * @constructor
 */
const CountryWithInteractiveRegion = function (props) {
  const { name, schema: { properties: { country, region } } } = props

  const {regions} = useContext(CodeLists)
  const [state, setState] = useState({
    country: country.default,
    region: undefined,
    city: undefined,
  })

  const currentRegions = regions.filter(({ country: { id } }) => id === state.country)
  const countryMapProps = getInteractiveMapProps(state.country)
  const regionMapProps = getInteractiveMapProps(`${state.country}.${state.region}`)

  const changeState = newState => {
    setState(newState)
    props.onChange(newState)
  }
  const handleCountryChange = country => changeState({
    country,
    region: undefined,
    city: undefined,
  })
  const handleRegionChange = region => changeState({
    ...state,
    region,
    city: undefined,

  })
  const handleRegionClick = ({ properties: { NAME_0: region } }) => changeState({
    ...state,
    region: parseInt(region) || undefined,
    city: undefined,
  })
  const handleCityClick = ({ properties: { VARNAME_2: city } }) => changeState({
    ...state,
    city: parseInt(city) || undefined,
  })
  const isRegionSelected = ({ properties: { NAME_0 } }) => !isNaN(NAME_0) && state.region === parseInt(NAME_0)
  const isCitySelected = ({ properties: { VARNAME_2 } }) => !isNaN(VARNAME_2) && state.city === parseInt(VARNAME_2)

  return (
    <div>
      <Select
        props={props}
        id={`${name}_country`}
        label={country.title}
        options={{
          enumOptions: country.enum.map((value, index) => ({
            value,
            label: country.enumNames[index],
          }))
        }}
        onChange={handleCountryChange}
        schema={country}
        value={state.country}
      />
      {countryMapProps ? (
        <InteractiveMap
          areaClick={handleRegionClick}
          isSelected={isRegionSelected}
          {...countryMapProps}
        />
      ) : currentRegions.length > 0 && (
        <Select
          props={props}
          id={`${name}_region`}
          label={region.title}
          options={{
            enumOptions: currentRegions.map(({general: {id: value, name: label}}) => ({
              value,
              label,
            }))
          }}
          onChange={handleRegionChange}
          schema={region}
          value={state.region}
        />
      )}
      {state.region && (
        <div>
          Region: {currentRegions.find(({general: {id}}) => id === state.region).general.name} <span onClick={() => changeState({...state, region: undefined, city: undefined})}>&times;</span>
        </div>
      )}
      {regionMapProps && (
        <InteractiveMap
          areaClick={handleCityClick}
          isSelected={isCitySelected}
          labelKey={'NAME_2'}
          {...regionMapProps}
        />
      )}
    </div>
  )
}

export default CountryWithInteractiveRegion