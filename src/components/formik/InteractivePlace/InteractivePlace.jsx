import { useContext } from 'react'
import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import { withTranslation } from '@/i18n/instance'
import getInteractiveMapProps from '@/utils/getInteractiveMapProps'
import { CodeLists } from '@/contexts/codeLists'
import InteractiveMap from '@/components/core/InteractiveMap'

const countryName = 'country'
const regionName = 'region'
const cityName = 'city'

const factoryChange = (name, handleChange) => value => handleChange(
  { target: { name, value } })

/**
 * With fallback to selectbox
 * @param props
 * @return {*}
 * @constructor
 */
const InteractivePlace = function ({ formik, t }) {
  const { handleChange, values } = formik

  const { countries, regions } = useContext(CodeLists)

  const currentRegions = regions.filter(
    ({ country: { id } }) => id === values[countryName])
  const countryMapProps = getInteractiveMapProps(values[countryName])

  const regionChange = factoryChange(regionName, handleChange)
  const cityChange = factoryChange(cityName, handleChange)

  const handleCountryChange = e => {
    handleChange(e)
    regionChange([])
    cityChange([])
  }

  // Selectbox
  const handleRegionChange = e => {
    handleChange(e)
    cityChange([])
  }

  // Map
  const handleRegionClick = ({ properties: { NAME_0: region } }) => {
    region = parseInt(region)

    if (isNaN(region)) {
      return
    }

    const newRegions = values[regionName] ? values[regionName].slice() : []
    const index = newRegions.indexOf(region)

    if (index > -1) {
      newRegions.splice(index, 1)
    } else {
      newRegions.push(region)
    }

    regionChange(newRegions)
  }
  const isRegionSelected = ({ properties: { NAME_0 } }) => !isNaN(NAME_0) &&
    values[regionName] && values[regionName].indexOf(parseInt(NAME_0)) > -1

  return (
    <div>
      <FormControl fullWidth margin={'normal'}>
        <InputLabel id={`${countryName}_country`} shrink>{t('countryTitle')}</InputLabel>
        <Select
          name={countryName}
          labelId={`${countryName}_country`}
          onChange={handleCountryChange}
          value={values[countryName]}
        >
          {countries.map(({ general: { id, name } }) => (
            <MenuItem key={id} value={id}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {countryMapProps ? (
        <InteractiveMap
          areaClick={handleRegionClick}
          isSelected={isRegionSelected}
          {...countryMapProps}
        />
      ) : currentRegions.length > 0 && (
        <FormControl fullWidth margin={'normal'}>
          <InputLabel id={`${regionName}_region`}>{t('regionTitle')}</InputLabel>
          <Select
            name={regionName}
            labelId={`${regionName}_region`}
            onChange={handleRegionChange}
            value={values[regionName]}
            multiple
          >
            {currentRegions.map(({ general: { id, name } }) => (
              <MenuItem key={id} value={id}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {values[regionName] && values[regionName].length > 0 && (
        <div>
          Region: {currentRegions
        .filter(({ general: { id } }) => values[regionName].indexOf(id) > -1)
        .map(({ general: { id, name } }) => (
          <Chip
            key={id}
            label={name}
            onDelete={() => handleRegionClick({ properties: { NAME_0: id } })}
            color={'primary'}
          />
        ))}
        </div>
      )}
    </div>
  )
}

export default withTranslation('searchForm')(InteractivePlace)