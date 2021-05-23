import { Button } from 'antd';
import { withFormik } from 'formik';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { addVariation } from '../../../../actions/variationsActions';
import { Br, Column, Form, Panel, Row } from '../../../../components/bootstrap';
import { InputText } from '../../../../components/form';
import Messages from '../../../../helpers/messages';
import { Container, Div } from './styles';
import VariationsGrid from './variationsGrid';

function InnerForm({ values, errors, handleSubmit, handleChange }) {
  const { variationsIsLoading } = useSelector(state => state.variations);

  return (
    <Form handleSubmit={handleSubmit}>
      <Container>
        <Div>
          <Column col="12">
            <Panel color="primary" title="Variações">
              <Column col="12">
                <Row>
                  <InputText
                    name="description"
                    col={6}
                    handleChange={handleChange}
                    required
                    error={errors.description}
                    value={values.description}
                    label="Nome"
                  />
                  <Button
                    style={{ marginTop: 27 }}
                    htmlType="submit"
                    disabled={variationsIsLoading}
                    className="pull-right"
                    type="primary"
                    loading={variationsIsLoading}>
                    Adicionar
                  </Button>
                </Row>
              </Column>
              <Column col="12" style={{ padding: '0' }}>
                <VariationsGrid />
              </Column>
            </Panel>
          </Column>
        </Div>
      </Container>

      <Br />
    </Form>
  );
}

const StepTwo = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({ description }) => ({
    description: description || '',
  }),
  validationSchema: Yup.object().shape({
    description: Yup.string().required(Messages.REQUIRED),
  }),

  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    props.add(values, resetForm, setErrors, setSubmitting);
  },
})(InnerForm);

const mapDispatchToProps = {
  add: addVariation,
};

export default connect(null, mapDispatchToProps)(StepTwo);
