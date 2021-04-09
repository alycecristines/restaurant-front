import React from 'react';
import { Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Messages from '../../../../helpers/messages';
import { Row, Column, Form, Br, Panel } from '../../../../components/bootstrap';
import { InputText, SelectCode } from '../../../../components/form';
import { Container, Div } from './styles';
import EmployeesGrid from './employeesGrid';

function InnerForm({ values, errors, isSubmitting, handleSubmit, handleChange }) {
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
                    dataSource={[{ id: 1, descricao: 'nada' }]} // TODO: alimentar esse dataSource
                    // loading={this.props.produtoReducer.loading}
                  />
                  <Button
                    style={{ marginTop: 27 }}
                    htmlType="button"
                    //onClick={TODO: handleAddEmployee}
                    className="pull-right"
                    type="primary"
                    // loading={this.props.colaboradorReducer.loading}
                  >
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
    if (!props.match.params.id) {
      // props.perfilActions.add(values, resetForm, setErrors, setSubmitting); TODO
    } else {
      // props.perfilActions.update(values, resetForm, setErrors, setSubmitting); TODO
    }
  },
})(InnerForm);

export default StepThree;
