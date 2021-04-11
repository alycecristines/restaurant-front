import React from 'react';
import { Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Messages from '../../../../helpers/messages';
import { Row, Column, Form, Br, Panel } from '../../../../components/bootstrap';
import { InputText, SelectCode } from '../../../../components/form';
import { Container, Div } from './styles';
import EmployeesGrid from './employeesGrid';
import { connect, useSelector } from 'react-redux';
import { addEmployee } from '../../../../actions/employeesActions';

function InnerForm({ values, errors, isSubmitting, handleSubmit, handleChange }) {
  const { departmentIsLoading, departmentRecords } = useSelector(state => state.departments);

  return (
    <Form handleSubmit={handleSubmit}>
      <Container>
        <Div>
          <Column col="12">
            <Panel color="primary" title="Colaboradores">
              <Column col="12">
                <Row>
                  <InputText
                    name="name"
                    col={7}
                    handleChange={handleChange}
                    required
                    error={errors.name}
                    value={values.name}
                    label="Nome"
                  />
                  <InputText
                    name="email"
                    col={5}
                    handleChange={handleChange}
                    required
                    error={errors.email}
                    value={values.email}
                    label="E-mail"
                  />
                  <SelectCode
                    name="departmentId"
                    col={3}
                    handleChange={handleChange}
                    required
                    error={errors.departmentId}
                    value={values.departmentId}
                    label="Departamento"
                    dataSource={departmentRecords}
                    loading={departmentIsLoading}
                  />
                  <Button
                    style={{ marginTop: 27 }}
                    htmlType="submit"
                    className="pull-right"
                    type="primary"
                    loading={isSubmitting}>
                    Adicionar
                  </Button>
                </Row>
              </Column>
              <Column col="12" style={{ padding: '0' }}>
                <EmployeesGrid />
              </Column>
            </Panel>
          </Column>
        </Div>
      </Container>

      <Br />
    </Form>
  );
}

const StepThree = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({ name, email, departmentId }) => ({
    name: name || '',
    email: email || '',
    departmentId: departmentId || '',
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required(Messages.REQUIRED),
    email: Yup.string().required(Messages.REQUIRED),
    departmentId: Yup.string().required(Messages.REQUIRED),
  }),

  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    props.add(values, resetForm, setErrors, setSubmitting);
  },
})(InnerForm);

const mapDispatchToProps = {
  add: addEmployee,
};

export default connect(null, mapDispatchToProps)(StepThree);
