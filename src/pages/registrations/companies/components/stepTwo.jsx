import React from 'react';
import { Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Messages from '../../../../helpers/messages';
import { Row, Column, Form, Br, Panel } from '../../../../components/bootstrap';
import { InputText } from '../../../../components/form';
import { Container, Div } from './styles';
import DepartmentsGrid from './departmentsGrid';

function InnerForm({ values, errors, isSubmitting, handleSubmit, handleChange }) {
  return (
    <Form handleSubmit={handleSubmit}>
      <Container>
        <Div>
          <Column col="12">
            <Panel color="primary" title="Departamentos">
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
                    htmlType="button"
                    //onClick={TODO: handleAddDepartment}
                    className="pull-right"
                    type="primary"
                    // loading={this.props.colaboradorReducer.loading}
                  >
                    Adicionar
                  </Button>
                </Row>
              </Column>
              <Column col="12" style={{ padding: '0' }}>
                <DepartmentsGrid />
              </Column>
            </Panel>
          </Column>
        </Div>
      </Container>

      {/* <Row>
        <Column col="12">
          <Button
            htmlType="submit"
            className="pull-right btn btn-primary"
            type="primary"
            loading={isSubmitting}>
            Salvar <i className="fa fa-check ml-1"></i>
          </Button>
        </Column>
      </Row> */}

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
    if (!props.match.params.id) {
      // props.perfilActions.add(values, resetForm, setErrors, setSubmitting); TODO
    } else {
      // props.perfilActions.update(values, resetForm, setErrors, setSubmitting); TODO
    }
  },
})(InnerForm);

export default StepTwo;
