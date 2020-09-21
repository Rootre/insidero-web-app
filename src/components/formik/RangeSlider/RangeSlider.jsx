import React, { useEffect, useState } from 'react'
import FormLabel from '@material-ui/core/FormLabel'
import Slider from '@material-ui/core/Slider'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'

import { withTranslation } from '@/i18n/instance'

const ValueLabelComponent = (props) => {
  const { children, open, value } = props

  return (
    <Tooltip open={open} enterTouchDelay={0} placement={'top'} title={value}>
      {children}
    </Tooltip>
  )
}

const RangeSlider = ({
  displayLabel = val => val,
  formik,
  max,
  min,
  nameMax,
  nameMin,
  optional = false,
  step,
  t,
  title,
}) => {
  const [isDisabled, setIsDisabled]  = useState(false)
  const { handleChange, values } = formik
  const [value, setValue] = useState([values[nameMin] || min, values[nameMax] || max])

  const setFormValues = values => {
    handleChange({ target: { name: nameMin, value: values[0] } })
    handleChange({ target: { name: nameMax, value: values[1] } })
  }
  const onChangeHandler = (__, values) => {
    setValue(values)
    setFormValues(values)
    if (formik.hasOwnProperty('setChipLabel')) {
      formik.setChipLabel([nameMin, nameMax].join(':'), [title, values.map(getValueText).join(' - ')])
    }
  }

  const getValueText = val => displayLabel(val)

  useEffect(() => {
    setFormValues( isDisabled ? [undefined, undefined] : value)
  }, [isDisabled])

  return (
    <div>
      <Grid container alignItems={'center'} spacing={2}>
        <Grid item>
          <FormLabel>{title}</FormLabel>
        </Grid>
        {optional && (
          <Grid item>
            <Grid container alignItems={'center'}>
              <Checkbox checked={isDisabled} id={`optional_${nameMin}_${nameMax}`} onChange={() => setIsDisabled(disabled => !disabled)}/>
              <InputLabel shrink htmlFor={`optional_${nameMin}_${nameMax}`}>{t('noRestriction')}</InputLabel>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Slider
        disabled={isDisabled}
        value={value}
        onChange={onChangeHandler}
        valueLabelDisplay={'auto'}
        aria-labelledby={'range-slider'}
        getAriaValueText={getValueText}
        valueLabelFormat={getValueText}
        min={min}
        max={max}
        step={step}
        ValueLabelComponent={ValueLabelComponent}
      />
    </div>
  )
}

export default withTranslation('searchForm')(RangeSlider)