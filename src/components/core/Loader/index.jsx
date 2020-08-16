import CircularProgress from '@material-ui/core/CircularProgress'
import styled from '@emotion/styled'

const LoaderWrapper = styled.div`
  position: relative;
  
  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const Loader = props => (
  <LoaderWrapper {...props}>
    <div>
      <CircularProgress />
    </div>
  </LoaderWrapper>
)

export default Loader