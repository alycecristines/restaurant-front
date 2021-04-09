import React from 'react';
import { Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Messages from '../../../../helpers/messages';
import { Row, Column, Form, Br } from '../../../../components/bootstrap';
import { InputText } from '../../../../components/form';
import { Container, Div } from './styles';

function InnerForm({ values, errors, isSubmitting, handleSubmit, handleChange }) {
  return (
    <Form handleSubmit={handleSubmit}>
      <Container>
        <Div>
          <Column col={12}>
            <Row>
              <h3 style={{ paddingLeft: 15, marginBottom: 20, color: '#B7791D', fontSize: 18 }}>
                Dados da Empresa
              </h3>
            </Row>
            <Row>
              {/* corporateName */}
              <InputText
                name="corporateName"
                col={6}
                handleChange={handleChange}
                required
                error={errors.corporateName}
                value={values.corporateName}
                label="Razão Social"
              />
              {/* businessName */}
              <InputText
                name="businessName"
                col={6}
                handleChange={handleChange}
                required
                error={errors.businessName}
                value={values.businessName}
                label="Nome Fantasia"
              />
              {/* registrationNumber */}
              <InputText
                name="registrationNumber"
                col={4}
                handleChange={handleChange}
                required
                error={errors.registrationNumber}
                value={values.registrationNumber}
                label="CNPJ"
              />
              {/* phone */}
              <InputText
                name="phone"
                col={4}
                handleChange={handleChange}
                required
                error={errors.phone}
                value={values.phone}
                label="Telefone"
              />
              {/* street */}
              <InputText
                name="street"
                col={4}
                handleChange={handleChange}
                required
                error={errors.street}
                value={values.street}
                label="Logradouro"
              />
              {/* secondary */}
              <InputText
                name="secondary"
                col={4}
                handleChange={handleChange}
                required
                error={errors.secondary}
                value={values.secondary}
                label="Complemento"
              />
              {/* district */}
              <InputText
                name="district"
                col={4}
                handleChange={handleChange}
                required
                error={errors.district}
                value={values.district}
                label="Setor"
              />
              {/* buildingNumber */}
              <InputText
                name="buildingNumber"
                col={4}
                handleChange={handleChange}
                required
                error={errors.buildingNumber}
                value={values.buildingNumber}
                label="Número"
              />
              {/* city */}
              <InputText
                name="city"
                col={4}
                handleChange={handleChange}
                required
                error={errors.city}
                value={values.city}
                label="Cidade"
              />
              {/* zipCode */}
              <InputText
                name="zipCode"
                col={4}
                handleChange={handleChange}
                required
                error={errors.zipCode}
                value={values.zipCode}
                label="CEP"
              />
              {/* state */}
              <InputText
                name="state"
                col={4}
                handleChange={handleChange}
                required
                error={errors.state}
                value={values.state}
                label="Estado"
              />
            </Row>
          </Column>
        </Div>
      </Container>

      <Row>
        <Column col="12">
          <Button
            htmlType="submit"
            className="pull-right btn btn-primary"
            type="primary"
            loading={isSubmitting}>
            Salvar <i className="fa fa-check ml-1"></i>
          </Button>
        </Column>
      </Row>

      <Br />
    </Form>
  );
}

const StepOne = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({
    corporateName,
    businessName,
    registrationNumber,
    phone,
    street,
    secondary,
    buildingNumber,
    district,
    city,
    state,
    zipCode,
  }) => ({
    corporateName: corporateName || '',
    businessName: businessName || '',
    registrationNumber: registrationNumber || '',
    phone: phone || '',
    street: street || '',
    secondary: secondary || '',
    buildingNumber: buildingNumber || '',
    district: district || '',
    city: city || '',
    state: state || '',
    zipCode: zipCode || '',
  }),
  validationSchema: Yup.object().shape({
    corporateName: Yup.string().required(Messages.REQUIRED),
    businessName: Yup.string().required(Messages.REQUIRED),
    registrationNumber: Yup.string().required(Messages.REQUIRED),
    phone: Yup.string().required(Messages.REQUIRED),
    street: Yup.string().required(Messages.REQUIRED),
    secondary: Yup.string().required(Messages.REQUIRED),
    buildingNumber: Yup.string().required(Messages.REQUIRED),
    district: Yup.string().required(Messages.REQUIRED),
    city: Yup.string().required(Messages.REQUIRED),
    state: Yup.string().required(Messages.REQUIRED),
    zipCode: Yup.string().required(Messages.REQUIRED),
  }),

  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    if (!props.match.params.id) {
      // props.perfilActions.add(values, resetForm, setErrors, setSubmitting); TODO
    } else {
      // props.perfilActions.update(values, resetForm, setErrors, setSubmitting); TODO
    }
  },
})(InnerForm);

export default StepOne;
