import { useState } from 'react'
import Slider from '@material-ui/core/Slider'
import Label from '@material-ui/core/FormLabel'
import Tooltip from '@material-ui/core/Tooltip'

const ValueLabelComponent = (props) => {
  const { children, open, value } = props

  return (
    <Tooltip open={open} enterTouchDelay={0} placement={'top'} title={value}>
      {children}
    </Tooltip>
  )
}

const RangeSlider = (props) => {
  const { schema: { properties, title }, uiSchema: {displayLabel} } = props
  const [min, max] = Object.keys(properties)

  const [state, setState] = useState({
    [min]: properties[min].minimum,
    [max]: properties[max].maximum,
  })

  const onChangeHandler = (__, values) => {
    const newState = {
      [min]: values[0],
      [max]: values[1],
    }

    setState(newState)
    props.onChange(newState)
  }

  const getValueText = val => typeof displayLabel === 'function' ? displayLabel(val) : val

  return (
    <div>
      <Label>{title}</Label>
      <Slider
        value={Object.values(state)}
        onChange={onChangeHandler}
        valueLabelDisplay={'auto'}
        aria-labelledby={'range-slider'}
        getAriaValueText={getValueText}
        valueLabelFormat={getValueText}
        min={properties[min].minimum}
        max={properties[max].maximum}
        step={properties[min].multipleOf || 1}
        ValueLabelComponent={ValueLabelComponent}
      />
    </div>
  )
}

export default RangeSlider