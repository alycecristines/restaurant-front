import React from 'react';
import { Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { Form, Row } from '../../components/bootstrap';
import { InputPassword } from '../../components/form';
import Messages from '../../helpers/messages';

const InnerForm = ({ values, errors, isSubmitting, handleSubmit, handleChange }) => {
  return (
    <Form handleSubmit={handleSubmit} className="m-t">
      <div style={{ marginBottom: 30 }}>
        <Row>
          <InputPassword
            name="password"
            handleChange={handleChange}
            col={12}
            required
            error={errors.password}
            value={values.password}
            label="Nova Senha"
          />
        </Row>
        <Row>
          <InputPassword
            name="confirmPassword"
            handleChange={handleChange}
            col={12}
            required
            error={errors.confirmPassword}
            value={values.confirmPassword}
            label="Confirmar Senha"
          />
        </Row>
        <Button htmlType="submit" className="col-md-12 mt-3" type="primary" loading={isSubmitting}>
          Salvar
        </Button>
      </div>
    </Form>
  );
};

const LoginForm = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({ password, confirmPassword }) => ({
    password: password || '',
    confirmPassword: confirmPassword || '',
  }),
  validationSchema: Yup.object().shape({
    password: Yup.string().required(Messages.REQUIRED),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas digitadas não são iguais.')
      .required(Messages.REQUIRED),
  }),
  // handleSubmit(values, { props, setSubmitting }) {
  handleSubmit() {
    //TODO: Acionar o salvar nova senha da api
  },
})(InnerForm);

export default LoginForm;
