import React from 'react';
import { Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Messages from '../../../../helpers/messages';
import { Row, Column, Form, Br, Panel } from '../../../../components/bootstrap';
import { InputText } from '../../../../components/form';
import { Container, Div } from './styles';
import DepartmentsGrid from './departmentsGrid';
import { connect, useSelector } from 'react-redux';
import { addDepartment } from '../../../../actions/departmentsActions';

function InnerForm({ values, errors, isSubmitting, handleSubmit, handleChange }) {
  const { departmentIsLoading } = useSelector(state => state.departments);

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
                    htmlType="submit"
                    disabled={departmentIsLoading}
                    className="pull-right"
                    type="primary"
                    loading={isSubmitting}>
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
  add: addDepartment,
};

export default connect(null, mapDispatchToProps)(StepTwo);
