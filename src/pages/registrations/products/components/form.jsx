import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import swal from 'sweetalert';

import { InputText } from '../../../../components/form';
import { Panel, Row, Column, Form, Br } from '../../../../components/bootstrap';
import Messages from '../../../../helpers/messages';
import { Container, Div } from './styles';
import VariationsGrid from './variationsGrid';
import { useDispatch, connect } from 'react-redux';
import {
  updateProduct,
  getProductById,
} from '../../../../actions/productsActions';
import {
  variationsSetSearch,
  variationsSetRecords,
  addVariation
} from '../../../../actions/variationsActions';

const InnerForm = ({
  variations,
  values,
  errors,
  isSubmitting,
  handleSubmit,
  handleChange,
  setValues,
}) => {
  const [data, setData] = useState({ description: '' });
  const dispatch = useDispatch();
  const productId = window.location.pathname.replace('/products/edit/', '');

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId, setValues));
    }

    return function cleanup() {
      dispatch([
        variationsSetSearch({ description: '' }),
        variationsSetRecords([]),
      ]);
    };
  }, []);

  function handleAddVariations() {
    if (data.description == '') {
      swal('É necessário informar o nome da variação a ser adicionada', { icon: 'warning' });
    } else {
      dispatch(addVariation(data.description, productId));
    }
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <Container>
        <Div>
          <Column col={12}>
            <Row>
              <h3 style={{ paddingLeft: 15, marginBottom: 20, color: '#B7791D', fontSize: 18 }}>
                Editar Produto
              </h3>
            </Row>
            <Row>
              {/* description */}
              <InputText
                name="description"
                col={6}
                handleChange={handleChange}
                required
                error={errors.description}
                value={values.description}
                label="Nome"
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
            Atualizar <i className="fa fa-check ml-1"></i>
          </Button>
        </Column>
      </Row>

      <Br />
      <Br />
      <Panel color="primary" title="Variações">
        <Column col="12">
          <Row>
            <InputText
              name="data.description"
              col={6}
              handleChange={e => setData({ description: e.target.value })}
              required
              value={data.description}
              label="Nome"
            />
            <Button
              style={{ marginTop: 27 }}
              htmlType="button"
              onClick={() => handleAddVariations()}
              className="pull-right"
              type="primary"
              loading={variations.variationsIsLoading}>
              Adicionar
            </Button>
          </Row>
        </Column>
        <Column col="12" style={{ padding: '0' }}>
          <VariationsGrid />
        </Column>
      </Panel>

      <Br />
    </Form>
  );
};

const ProductForm = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({ description }) => ({
    description: description || '',
  }),
  validationSchema: Yup.object().shape({
    description: Yup.string().required(Messages.REQUIRED),
  }),

  handleSubmit(values, { props, setErrors, setSubmitting }) {
    props.update(props.match.params.id, values, setErrors, setSubmitting);
  },
})(InnerForm);

const mapStateToProps = state => ({
  variations: state.variations,
});

const mapDispatchToProps = {
  update: updateProduct,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductForm));
