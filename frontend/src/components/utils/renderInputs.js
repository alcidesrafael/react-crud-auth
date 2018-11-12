import React from 'react'
import TextField from '@material-ui/core/TextField'
import RadioGroup from '@material-ui/core/RadioGroup'
import Switch from '@material-ui/core/Switch'

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  let hasError = false
  if (error) {
    hasError = true
  }
  return (
    <TextField
      label={label}
      helperText={touched && error}
      error={touched && hasError}
      {...input}
      {...custom}
    />
  )
}

export const renderSwitch = ({ input, label }) => (
  <Switch label={label} checked={input.value ? true : false} onChange={input.onChange} />
)

export const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)
