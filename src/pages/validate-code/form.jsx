import React from 'react';
import { Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { Form, Row } from '../../components/bootstrap';
import { InputText } from '../../components/form';
import Messages from '../../helpers/messages';

import { validateCode } from '../../actions/loginActions';

const InnerForm = ({ values, errors, isSubmitting, handleSubmit, handleChange }) => {
  return (
    <Form handleSubmit={handleSubmit} className="m-t">
      <div style={{ marginBottom: 30 }}>
        <Row>
          <InputText
            name="validationCode"
            handleChange={handleChange}
            col={12}
            required
            error={errors.validationCode}
            value={values.validationCode}
            label="Código de validação"
          />
        </Row>
        <Button htmlType="submit" className="col-md-12 mt-3" type="primary" loading={isSubmitting}>
          Validar
        </Button>
      </div>
    </Form>
  );
};

const LoginForm = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({ validationCode }) => ({
    validationCode: validationCode || '',
  }),
  validationSchema: Yup.object().shape({
    validationCode: Yup.string().required(Messages.REQUIRED),
  }),
  handleSubmit(values, { props }) {
    props.validateCode(values);
  },
})(InnerForm);

const mapDispatchToProps = {
  validateCode,
};

export default connect(null, mapDispatchToProps)(LoginForm);
