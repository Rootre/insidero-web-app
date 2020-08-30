import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '@material-ui/core/Button'

const SearchForm = ({ formik, isLoading, t }) => {
  return (
    <Formik
      {...formik}
    >
      {() => (
        <Form>
          <Field type="email" name="email"/>
          <ErrorMessage name="email" component="div"/>
          <Field type="password" name="password"/>
          <ErrorMessage name="password" component="div"/>
          <Button
            color={'primary'}
            variant={'contained'}
            size={'large'}
            type={'submit'}
            disabled={isLoading}
          >
            {t('sendButton')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SearchForm