import React from 'react';
import { Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Messages from '../../../../helpers/messages';
import { Row, Column, Form, Br } from '../../../../components/bootstrap';
import { InputText } from '../../../../components/form';
import { Container, Div } from './styles';
import { addCompany } from '../../../../actions/companiesActions';
import { connect, useSelector } from 'react-redux';

function InnerForm({ values, errors, isSubmitting, handleSubmit, handleChange }) {
  const { companiesDisableFields } = useSelector(state => state.companies);

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
                disabled={companiesDisableFields}
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
                disabled={companiesDisableFields}
                error={errors.businessName}
                value={values.businessName}
                label="Nome Fantasia"
              />
              {/* registrationNumber */}
              <InputText
                name="registrationNumber"
                col={5}
                handleChange={handleChange}
                required
                disabled={companiesDisableFields}
                error={errors.registrationNumber}
                value={values.registrationNumber}
                label="CNPJ"
              />
              {/* phone.areaCode */}
              <InputText
                name="phone.areaCode"
                col={2}
                handleChange={handleChange}
                required
                disabled={companiesDisableFields}
                error={errors.phone}
                value={values.phone.areaCode}
                label="DDD"
              />
              {/* phone.number */}
              <InputText
                name="phone.number"
                col={5}
                handleChange={handleChange}
                required
                disabled={companiesDisableFields}
                error={errors.phone}
                value={values.phone.number}
                label="Telefone"
              />
              {/* address.street */}
              <InputText
                name="address.street"
                col={4}
                handleChange={handleChange}
                required
                disabled={companiesDisableFields}
                error={errors.address}
                value={values.address.street}
                label="Logradouro"
              />
              {/* address.secondary */}
              <InputText
                name="address.secondary"
                col={4}
                handleChange={handleChange}
                required
                disabled={companiesDisableFields}
                error={errors.address}
                value={values.address.secondary}
                label="Complemento"
              />
              {/* address.district */}
              <InputText
                name="address.district"
                col={4}
                handleChange={handleChange}
                required
                disabled={companiesDisableFields}
                error={errors.address}
                value={values.address.district}
                label="Setor"
              />
              {/* address.buildingNumber */}
              <InputText
                name="address.buildingNumber"
                col={4}
                handleChange={handleChange}
                required
                disabled={companiesDisableFields}
                error={errors.address}
                value={values.address.buildingNumber}
                label="Número"
              />
              {/* address.city */}
              <InputText
                name="address.city"
                col={4}
                handleChange={handleChange}
                required
                disabled={companiesDisableFields}
                error={errors.address}
                value={values.address.city}
                label="Cidade"
              />
              {/* address.zipCode */}
              <InputText
                name="address.zipCode"
                col={4}
                handleChange={handleChange}
                required
                disabled={companiesDisableFields}
                error={errors.address}
                value={values.address.zipCode}
                label="CEP"
              />
              {/* address.state */}
              <InputText
                name="address.state"
                col={4}
                handleChange={handleChange}
                required
                disabled={companiesDisableFields}
                error={errors.address}
                value={values.address.state}
                label="Estado"
              />
              {/* address.country */}
              <InputText
                name="address.country"
                col={4}
                handleChange={handleChange}
                required
                disabled={companiesDisableFields}
                error={errors.address}
                value={values.address.country}
                label="País"
              />
            </Row>
          </Column>
        </Div>
      </Container>

      {!companiesDisableFields && (
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
      )}

      <Br />
    </Form>
  );
}

const StepOne = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({ corporateName, businessName, registrationNumber, phone, address }) => ({
    corporateName: corporateName || '',
    businessName: businessName || '',
    registrationNumber: registrationNumber || '',
    phone: phone || '',
    address: address || '',
  }),
  validationSchema: Yup.object().shape({
    corporateName: Yup.string().required(Messages.REQUIRED),
    businessName: Yup.string().required(Messages.REQUIRED),
    registrationNumber: Yup.string().required(Messages.REQUIRED),
    phone: Yup.object().required(Messages.REQUIRED),
    address: Yup.object().required(Messages.REQUIRED),
  }),

  handleSubmit(values, { props, setErrors, setSubmitting }) {
    props.add(values, setErrors, setSubmitting);
  },
})(InnerForm);

const mapDispatchToProps = {
  add: addCompany,
};

export default connect(null, mapDispatchToProps)(StepOne);
