const CustomCheckbox = function (props) {
  return (
    <button id="custom" className={props.value ? 'checked' : 'unchecked'}
            onClick={() => props.onChange(!props.value)}>
      {String(props.value)}
    </button>
  )
}

export default CustomCheckbox