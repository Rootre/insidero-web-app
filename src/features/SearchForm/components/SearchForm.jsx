import styled from '@emotion/styled'
import Button from '@material-ui/core/Button'

import OfferType from '@/components/formik/OfferType'
import InteractivePlace from '@/components/formik/InteractivePlace/InteractivePlace'
import RangeSlider from '@/components/formik/RangeSlider'

const StyledForm = styled.div`
  max-width: 500px;
  margin: 2em auto;
`

const SearchForm = ({ formik, isLoading, t }) => {
  return (
    <StyledForm>
      <form onSubmit={formik.handleSubmit}>
        <OfferType formik={formik}/>
        <InteractivePlace formik={formik}/>
        <RangeSlider
          displayLabel={val => `${val / 1000000} mil.`}
          formik={formik}
          max={20000000}
          min={0}
          nameMax={'priceSellMax'}
          nameMin={'priceSellMin'}
          step={100000}
          title={t('priceSellTitle')}
          optional
        />
        <RangeSlider
          formik={formik}
          max={200}
          min={0}
          nameMax={'spaceMax'}
          nameMin={'spaceMin'}
          step={10}
          title={t('spaceTitle')}
          optional
        />
        <Button
          color={'primary'}
          variant={'contained'}
          size={'large'}
          type={'submit'}
          disabled={isLoading}
        >
          {t('sendButton')}
        </Button>
      </form>
    </StyledForm>
  )
}

export default SearchForm