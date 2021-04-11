import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import swal from 'sweetalert';

import { InputText, SelectCode } from '../../../../components/form';
import { Panel, Row, Column, Form, Br } from '../../../../components/bootstrap';
import Messages from '../../../../helpers/messages';
import { Container, Div } from './styles';
import DepartmentGrid from './departmentsGrid';
import EmployeesGrid from './employeesGrid';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getCompanyById, updateCompany } from '../../../../actions/companiesActions';
import { addDepartment, getAllDepartments } from '../../../../actions/departmentsActions';
import { addEmployee, getAllEmployees } from '../../../../actions/employeesActions';

const InnerForm = ({
  departments,
  employees,
  values,
  errors,
  isSubmitting,
  handleSubmit,
  handleChange,
  setFieldValue,
  setValues,
}) => {
  const [data, setData] = useState({ description: '', name: '', email: '', departmentId: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    let id = window.location.pathname.replace('/companies/edit/', '');

    if (id) {
      dispatch([getCompanyById(id, setValues), getAllDepartments(), getAllEmployees()]);
    }
  }, []);

  function handleChange(name, value) {
    setFieldValue(name, value);
  }

  function handleAddDepartments() {
    if (data.description == '') {
      swal('É necessário informar o nome do departamento a ser adicionado', { icon: 'warning' });
    } else {
      dispatch(addDepartment(data.description));
    }
  }

  function handleAddEmployee() {
    if (data.name == '' || data.email == '' || data.departmentId == '') {
      swal('É necessário preencher as informações obrigatórias para adicionar um colaborador', {
        icon: 'warning',
      });
    } else {
      dispatch(addEmployee(data));
    }
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
                departments
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
              {/* phone.areaCode */}
              <InputText
                name="phone.areaCode"
                col={4}
                handleChange={handleChange}
                required
                error={errors.phone}
                value={values.phone?.areaCode}
                label="DDD"
              />
              {/* phone.number */}
              <InputText
                name="phone.number"
                col={4}
                handleChange={handleChange}
                required
                error={errors.phone}
                value={values.phone?.number}
                label="Telefone"
              />
              {/* address.street */}
              <InputText
                name="address.street"
                col={4}
                handleChange={handleChange}
                required
                error={errors.address}
                value={values.address?.street}
                label="Logradouro"
              />
              {/* address.secondary */}
              <InputText
                name="address.secondary"
                col={4}
                handleChange={handleChange}
                required
                error={errors.address}
                value={values.address?.secondary}
                label="Complemento"
              />
              {/* address.district */}
              <InputText
                name="address.district"
                col={4}
                handleChange={handleChange}
                required
                error={errors.address}
                value={values.address?.district}
                label="Setor"
              />
              {/* address.buildingNumber */}
              <InputText
                name="address.buildingNumber"
                col={4}
                handleChange={handleChange}
                required
                error={errors.address}
                value={values.address?.buildingNumber}
                label="Número"
              />
              {/* address.city */}
              <InputText
                name="address.city"
                col={4}
                handleChange={handleChange}
                required
                error={errors.address}
                value={values.address?.city}
                label="Cidade"
              />
              {/* address.zipCode */}
              <InputText
                name="address.zipCode"
                col={4}
                handleChange={handleChange}
                required
                error={errors.address}
                value={values.address?.zipCode}
                label="CEP"
              />
              {/* address.state */}
              <InputText
                name="address.state"
                col={4}
                handleChange={handleChange}
                required
                error={errors.address}
                value={values.address?.state}
                label="Estado"
              />
              {/* address.country */}
              <InputText
                name="address.country"
                col={4}
                handleChange={handleChange}
                required
                error={errors.address}
                value={values.address?.country}
                label="País"
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
              onClick={() => handleAddDepartments()}
              className="pull-right"
              type="primary"
              loading={departments.departmentIsLoading}>
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
              dataSource={departments.departmentRecords}
              loading={departments.departmentIsLoading}
            />
            <Button
              style={{ marginTop: 27 }}
              htmlType="button"
              onClick={() => handleAddEmployee()}
              className="pull-right"
              type="primary"
              loading={employees.employeeIsLoading}>
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
    address,
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
    address: address || '',
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
    phone: Yup.object().required(Messages.REQUIRED),
    address: Yup.object().required(Messages.REQUIRED),
    street: Yup.string().required(Messages.REQUIRED),
    secondary: Yup.string().required(Messages.REQUIRED),
    buildingNumber: Yup.string().required(Messages.REQUIRED),
    district: Yup.string().required(Messages.REQUIRED),
    city: Yup.string().required(Messages.REQUIRED),
    state: Yup.string().required(Messages.REQUIRED),
    zipCode: Yup.string().required(Messages.REQUIRED),
  }),

  handleSubmit(values, { props, setErrors, setSubmitting }) {
    props.update(props.match.params.id, values, setErrors, setSubmitting);
  },
})(InnerForm);

const mapStateToProps = state => ({
  departments: state.departments,
  employees: state.employees,
});

const mapDispatchToProps = {
  update: updateCompany,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyForm));
