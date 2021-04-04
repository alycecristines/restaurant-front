import React from 'react';
import { Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Center, Column, Form, Row } from '../../components/bootstrap';
import { InputPassword, InputText } from '../../components/form';
import Messages from '../../helpers/messages';

const InnerForm = ({ values, errors, isSubmitting, handleSubmit, handleChange }) => {
  return (
    <Form handleSubmit={handleSubmit} className="m-t">
      <div className="animated fadeInDown">
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
            name="senha"
            handleChange={handleChange}
            col={12}
            required
            error={errors.senha}
            value={values.senha}
            label="Senha"
          />
        </Row>

        <Column col={12}>
          <Row>
            <Link to="/reset-senha">Esqueceu sua senha?</Link>
          </Row>
        </Column>

        <Button htmlType="submit" className="col-md-12 mt-3" type="primary" loading={isSubmitting}>
          Entrar
        </Button>
        <div style={{ marginTop: 15 }}>
          <Center>OU</Center>
        </div>
        <Button
          htmlType="submit"
          className="outlined col-md-12 mt-3"
          type="primary"
          loading={isSubmitting}>
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
  handleSubmit(values, { props, setSubmitting }) {
    //TODO: Acionar o login da api
  },
})(InnerForm);

export default LoginForm;
