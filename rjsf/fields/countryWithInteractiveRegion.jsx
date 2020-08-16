import InteractiveMap from '@/components/core/InteractiveMap'
import getInteractiveMapProps from '@/utils/getInteractiveMapProps'
import { useContext } from 'react'
import { CodeLists } from '@/contexts/codeLists'
import Select from '@/components/mui/Select'

/**
 * With fallback to selectbox
 * @param props
 * @return {*}
 * @constructor
 */
const CountryWithInteractiveRegion = function (props) {
  const { formData, name, schema: { properties: { country, region } } } = props

  const {countries, regions} = useContext(CodeLists)

  const currentRegions = regions.filter(({ country: { id } }) => id === formData.country)
  const countryMapProps = getInteractiveMapProps(formData.country)
  const regionMapProps = getInteractiveMapProps(`${formData.country}.${formData.region}`)

  const changeState = newState => {
    props.onChange(newState)
  }
  const handleCountryChange = country => changeState({
    country,
    region: undefined,
    city: undefined,
  })
  const handleRegionChange = region => changeState({
    ...formData,
    region,
    city: undefined,

  })
  const handleRegionClick = ({ properties: { NAME_0: region } }) => {
    region = parseInt(region)

    changeState({
      ...formData,
      region: !region || formData.region === region ? undefined : region,
      city: undefined,
    })
  }
  const handleCityClick = ({ properties: { VARNAME_2: city } }) => changeState({
    ...formData,
    city: parseInt(city) || undefined,
  })
  const isRegionSelected = ({ properties: { NAME_0 } }) => !isNaN(NAME_0) && formData.region === parseInt(NAME_0)
  const isCitySelected = ({ properties: { VARNAME_2 } }) => !isNaN(VARNAME_2) && formData.city === parseInt(VARNAME_2)

  return (
    <div>
      <Select
        props={props}
        id={`${name}_country`}
        label={country.title}
        options={{
          enumOptions: countries.map(({general: {id: value, name: label}}) => ({
            value,
            label,
          }))
        }}
        onChange={handleCountryChange}
        schema={country}
        value={formData.country}
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
          value={formData.region}
        />
      )}
      {formData.region && (
        <div>
          Region: {currentRegions.find(({general: {id}}) => id === formData.region).general.name} <span onClick={() => handleRegionChange()}>&times;</span>
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