import React from 'react';
import { Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Center, Column, Form, Row } from '../../components/bootstrap';
import { InputPassword, InputText } from '../../components/form';
import Messages from '../../helpers/messages';
import history from '../../helpers/history';

const InnerForm = ({ values, errors, isSubmitting, handleSubmit, handleChange }) => {
  return (
    <Form handleSubmit={handleSubmit} className="m-t">
      <div className="animated fadeInDown" style={{ marginBottom: 30 }}>
        <Row>
          <InputText
            name="email"
            handleChange={handleChange}
            col={12}
            required
            error={errors.email}
            value={values.email}
            label="Email"
          />
        </Row>

        <Row>
          <InputPassword
            name="password"
            handleChange={handleChange}
            col={12}
            required
            error={errors.password}
            value={values.password}
            label="Senha"
          />
        </Row>

        <Column col={12}>
          <Row>
            <Link to="/reset-password">Esqueceu sua senha?</Link>
          </Row>
        </Column>

        <Button htmlType="submit" className="col-md-12 mt-3" type="primary" loading={isSubmitting}>
          Entrar
        </Button>
        <div style={{ marginTop: 15 }}>
          <Center>OU</Center>
        </div>
        <Button
          onClick={() => history.push('/first-access')}
          htmlType="button"
          className="outlined col-md-12 mt-3"
          type="primary">
          Primeiro Acesso
        </Button>
      </div>
    </Form>
  );
};

const LoginForm = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({ email, password }) => ({
    email: email || '',
    password: password || '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required(Messages.REQUIRED),
    password: Yup.string().required(Messages.REQUIRED),
  }),
  // handleSubmit(values, { props, setSubmitting }) {
  handleSubmit() {
    //TODO: Acionar o login da api
  },
})(InnerForm);

export default LoginForm;
