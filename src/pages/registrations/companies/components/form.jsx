import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import { Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import * as Yup from 'yup';

import { InputText, SelectCode } from '../../../../components/form';
import { Panel, Row, Column, Form, Br, H3 } from '../../../../components/bootstrap';
import Messages from '../../../../helpers/messages';
import { Container, Div } from './styles';
import DepartmentGrid from './departmentsGrid';
import EmployeesGrid from './employeesGrid';

const InnerForm = ({ values, errors, isSubmitting, handleSubmit, handleChange, setFieldValue }) => {
  const [data, setData] = useState({ description: '', name: '', email: '', departmentId: '' });

  // useEffect(() => {
  //   if (this.props.match.params.id) {
  //     // this.props.perfilActions.get(this.props.match.params.id, this.props.setValues);
  //     // fazer o getDepartamentos (id e description) pra alimentar o selectCode
  //   }
  // }, []);

  function handleChange(name, value) {
    setFieldValue(name, value);
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <Container>
        <Div>
          <Column col={12}>
            <Row>
              <h3 style={{ paddingLeft: 15, marginBottom: 20, color: '#B7791D', fontSize: 18 }}>
                Editar Empresa
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
      <Br />
      <Panel color="primary" title="Departamentos">
        <Column col="12">
          <Row>
            <InputText
              name="description"
              col={6}
              handleChange={value => setData({ description: value })}
              required
              value={data.description}
              label="Nome"
            />
            <Button
              style={{ marginTop: 27 }}
              htmlType="button"
              //onClick={TODO: handleAddDepartment}
              className="pull-right"
              type="primary"
              // loading={this.props.colaboradorReducer.loading}
            >
              Adicionar
            </Button>
          </Row>
        </Column>
        <Column col="12" style={{ padding: '0' }}>
          <DepartmentGrid />
        </Column>
      </Panel>

      <Br />
      <Br />
      <Panel color="primary" title="Colaboradores">
        <Column col="12">
          <Row>
            <InputText
              name="name"
              col={7}
              handleChange={value => setData({ name: value })}
              required
              value={data.name}
              label="Nome"
            />
            <InputText
              name="email"
              col={5}
              handleChange={value => setData({ email: value })}
              required
              value={data.email}
              label="E-mail"
            />
            <SelectCode
              name="departmentId"
              col={3}
              handleChange={value => setData({ departmentId: value })}
              required
              value={data.departmentId}
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
    </Form>
  );
};

const CompanyForm = withFormik({
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

export default withRouter(CompanyForm);
