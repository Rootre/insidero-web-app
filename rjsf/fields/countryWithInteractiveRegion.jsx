import SelectWidget from '@/components/mui/SelectWidget'
import InteractiveMap from '@/components/core/InteractiveMap'
import getInteractiveMapProps from '@/utils/getInteractiveMapProps'
import { useContext, useState } from 'react'
import { FieldTemplate } from '@rjsf/material-ui'
import { CodeLists } from '@/contexts/codeLists'

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
  })

  const currentRegions = regions.filter(({ country: { id } }) => id === state.country)
  const mapProps = getInteractiveMapProps(state.country)

  console.log('currentRegions', currentRegions.map(({general: {id, name}}) => ({id, name})))

  const changeState = newState => {
    setState(newState)
    props.onChange(newState)
  }
  const handleCountryChange = country => changeState({
    country,
    region: undefined,
  })
  const handleRegionChange = region => changeState({
    ...state,
    region,
  })
  const regionClickFactory = ({ properties: { INSIDERO_ID: region } }) => () => changeState({
    ...state,
    region,
  })
  const isSelected = ({ properties: { INSIDERO_ID } }) => typeof INSIDERO_ID === 'number' && state.region === INSIDERO_ID

  return (
    <div>
      <FieldTemplate>
        <SelectWidget
          id={`${name}_country`}
          schema={country}
          uiSchema={{}}
          value={state.country}
          required={props.required}
          disabled={props.disabled}
          readonly={props.readonly}
          autofocus={props.autofocus}
          options={{
            enumOptions: country.enum.map((value, index) => ({
              value,
              label: country.enumNames[index],
            }))
          }}
          onChange={handleCountryChange}
          formContext={props.formContext}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          label={country.title}
          multiple={false}
          rawErrors={props.rawErrors}
        />
      </FieldTemplate>
      {mapProps ? (
        <InteractiveMap
          selectedAreas={[state.region]}
          clickFactory={regionClickFactory}
          isSelected={isSelected}
          {...mapProps}
        />
      ) : (
        <FieldTemplate>
          <SelectWidget
            id={`${name}_region`}
            schema={region}
            uiSchema={{}}
            value={state.region}
            required={props.required}
            disabled={props.disabled}
            readonly={props.readonly}
            autofocus={props.autofocus}
            options={{
              enumOptions: currentRegions.map(({general: {id: value, name: label}}) => ({
                value,
                label,
              }))
            }}
            onChange={handleRegionChange}
            formContext={props.formContext}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            label={region.title}
            multiple={false}
            rawErrors={props.rawErrors}
          />
        </FieldTemplate>
      )}
    </div>
  )
}

export default CountryWithInteractiveRegion