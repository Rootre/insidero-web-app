import InteractiveMap from '@/components/core/InteractiveMap'
import getInteractiveMapProps from '@/utils/getInteractiveMapProps'
import { useContext } from 'react'
import { CodeLists } from '@/contexts/codeLists'
import Select from '@/components/mui/Select'
import Chip from '@material-ui/core/Chip'

/**
 * With fallback to selectbox
 * @param props
 * @return {*}
 * @constructor
 */
const CountryWithInteractiveRegion = function (props) {
  const { formData, name, schema: { properties: { country: schemaCountry, region: schemaRegion } } } = props

  const { countries, regions } = useContext(CodeLists)

  const currentRegions = regions.filter(({ country: { id } }) => id === formData.country)
  const countryMapProps = getInteractiveMapProps(formData.country)

  const handleCountryChange = country => props.onChange({
    country,
    region: undefined,
    city: undefined,
  })

  // Selectbox
  const handleRegionChange = region => props.onChange({
    ...formData,
    region: [region], // TODO: make select multiple
    city: undefined,
  })
  // Map
  const handleRegionClick = ({ properties: { NAME_0: region } }) => {
    region = parseInt(region)
    const newRegions = formData.region ? formData.region.slice() : []
    const index = newRegions.indexOf(region)

    if (index > -1) {
      newRegions.splice(index, 1)
    } else {
      newRegions.push(region)
    }

    props.onChange({
      ...formData,
      region: newRegions,
    })
  }
  const isRegionSelected = ({ properties: { NAME_0 } }) => !isNaN(NAME_0) && formData.region && formData.region.indexOf(parseInt(NAME_0)) > -1

  return (
    <div>
      <Select
        props={props}
        id={`${name}_country`}
        label={schemaCountry.title}
        options={{
          enumOptions: countries.map(
            ({ general: { id: value, name: label } }) => ({
              value,
              label,
            })),
        }}
        onChange={handleCountryChange}
        schema={schemaCountry}
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
          label={schemaRegion.title}
          options={{
            enumOptions: currentRegions.map(
              ({ general: { id: value, name: label } }) => ({
                value,
                label,
              })),
          }}
          onChange={handleRegionChange}
          schema={schemaRegion}
          value={formData.region}
        />
      )}
      {formData.region && formData.region.length > 0 && (
        <div>
          Region: {currentRegions.filter(
          ({ general: { id } }) => formData.region.indexOf(id) > -1)
        .map(({ general: { id, name } }) => (
          <Chip label={name} onDelete={() => handleRegionClick({properties: { NAME_0: id }})} color={'primary'}/>
        ))}
        </div>
      )}
    </div>
  )
}

export default CountryWithInteractiveRegion