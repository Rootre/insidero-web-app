/**
 *
 * @param InputComponent
 * @return {Function}
 */
const withTitleValuePairs = id => InputComponent => props => {
  props.handleChange = (e, title, value) => {
    config.setTitleValuePair(title, value)
    props.handleChange(e)
  }
  return <InputComponent {...props}/>
}

export default withTitleValuePairs