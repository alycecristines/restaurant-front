import React from 'react';
import { Button } from 'antd';
import { withFormik } from 'formik';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { Form, Row } from '../../components/bootstrap';
import { InputText } from '../../components/form';
import Messages from '../../helpers/messages';
import { forgotPassword } from '../../actions/loginActions';

const InnerForm = ({ values, errors, isSubmitting, handleSubmit, handleChange }) => {
  return (
    <Form handleSubmit={handleSubmit} className="m-t">
      <div style={{ marginBottom: 30 }}>
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
        <Button htmlType="submit" className="col-md-12 mt-3" type="primary" loading={isSubmitting}>
          Próximo
        </Button>
        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <Link to="/login" className="btn btn-block btn-link">
            Voltar para o Login
          </Link>
        </div>
      </div>
    </Form>
  );
};

const LoginForm = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({ email }) => ({
    email: email || '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required(Messages.REQUIRED),
  }),
  handleSubmit(values, { props }) {
    props.forgotPassword(values);
  },
})(InnerForm);

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = {
  forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
