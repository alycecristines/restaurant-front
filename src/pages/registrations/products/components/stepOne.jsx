import React from 'react';
import { Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Messages from '../../../../helpers/messages';
import { Row, Column, Form, Br } from '../../../../components/bootstrap';
import { InputText } from '../../../../components/form';
import { Container, Div } from './styles';
import { addProduct } from '../../../../actions/productsActions';
import { connect, useSelector } from 'react-redux';

function InnerForm({ values, errors, isSubmitting, handleSubmit, handleChange }) {
  const { productDisableFields } = useSelector(state => state.products);

  return (
    <Form handleSubmit={handleSubmit}>
      <Container>
        <Div>
          <Column col={12}>
            <Row>
              <h3 style={{ paddingLeft: 15, marginBottom: 20, color: '#B7791D', fontSize: 18 }}>
                Dados do Produto
              </h3>
            </Row>
            <Row>
              {/* description */}
              <InputText
                name="description"
                col={6}
                handleChange={handleChange}
                required
                disabled={productDisableFields}
                error={errors.description}
                value={values.description}
                label="Nome do Produto"
              />
            </Row>
          </Column>
        </Div>
      </Container>

      {!productDisableFields && (
        <Row>
          <Column col="12">
            <Button
              htmlType="submit"
              className="pull-right btn btn-primary"
              type="primary"
              loading={isSubmitting}>
              Salvar <i className="fa fa-check ml-1"></i>
            </Button>
          </Column>
        </Row>
      )}

      <Br />
    </Form>
  );
}

const StepOne = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({ description }) => ({
    description: description || '',
  }),
  validationSchema: Yup.object().shape({
    description: Yup.string().required(Messages.REQUIRED),
  }),

  handleSubmit(values, { props, setErrors, setSubmitting }) {
    props.add(values, setErrors, setSubmitting);
  },
})(InnerForm);

const mapDispatchToProps = {
  add: addProduct,
};

export default connect(null, mapDispatchToProps)(StepOne);
