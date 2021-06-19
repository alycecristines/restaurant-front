import React, { Suspense, useState, useEffect } from 'react';
import { Button, notification, Typography } from 'antd';
import { getAllProducts } from '../../actions/productsActions';
import Content from '../../components/theme/content';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../actions/loginActions';
import { getAllVariations } from '../../actions/variationsActions';
import { Br, Column, Panel, Row } from '../../components/bootstrap';
import { SelectCode } from '../../components/form';
import GridItems from './grid';
import swal from 'sweetalert';
import { addOrder } from '../../actions/ordersActions';

const { Paragraph } = Typography;

const OrdersRequest = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [variationsListFilter, setVariationsListFilter] = useState([]);
  const [gridList, setGridList] = useState([]);
  const [product, setProduct] = useState('');
  const [variation, setVariation] = useState('');
  const dispatch = useDispatch();

  const { productIsLoading, productRecords } = useSelector(state => state.products);
  const { variationsRecords, variationsIsLoading } = useSelector(state => state.variations);

  useEffect(() => {
    dispatch([getAllProducts(), getAllVariations()]);
  }, []);

  function handleAddItem() {
    if (product === '' || variation === '') {
      swal('É necessário selecionar itens.', { icon: 'warning' });
    } else {
      const newItem = {
        productId: product,
        variationId: variation,
      };

      const productInfo = productRecords.find(item => item.id === product);
      const variationInfo = variationsRecords.find(item => item.id === variation);

      const newGridListItem = {
        id: productInfo?.id,
        productName: productInfo?.description,
        variationId: variationInfo?.id,
        variationName: variationInfo?.description,
      };

      setGridList([...gridList, newGridListItem]);
      setOrderItems([...orderItems, newItem]);

      setProduct('');
      setVariation('');
    }
  }

  function handleVariationFilter(productId) {
    const variationList = variationsRecords.filter(item => {
      if (item.productId === productId) return item;
    });
    setVariationsListFilter(variationList);
  }

  function handleSendOrder() {
    if (orderItems.length) {
      dispatch(addOrder(orderItems));
    } else {
      swal('É necessário selecionar itens.', { icon: 'warning' });
    }
  }

  return (
    <Suspense
      fallback={
        <div>
          <br />
          Carregando...
        </div>
      }>
      <Content>
        <Paragraph>
          <span
            style={{
              fontSize: 16,
            }}>
            Selecione abaixo os itens que devem compor sua refeição de hoje
          </span>
        </Paragraph>

        <Br />
        <Br />
        <Br />

        <Panel color="primary" title="Selecionar Produtos">
          <div className="col-sm-8 desc" style={{ justifyContent: 'center' }}>
            <Column col="12" style={{ paddingLeft: 30 }}>
              <Row>
                <SelectCode
                  name="productId"
                  col={4}
                  handleChange={value => {
                    setProduct(value);
                    handleVariationFilter(value);
                  }}
                  value={product}
                  required={true}
                  showSearch={true}
                  label="Produto"
                  dataSource={productRecords}
                  loading={productIsLoading}
                />
                <SelectCode
                  name="variationId"
                  col={4}
                  handleChange={value => setVariation(value)}
                  value={variation}
                  required={true}
                  showSearch={true}
                  label="Variação"
                  dataSource={variationsListFilter}
                />
                <div className={`col-md-2`} style={{ alignSelf: 'center' }}>
                  <div className="row">
                    <span className="input-group-btn" style={{ marginTop: 10 }}>
                      <button
                        type="button"
                        onClick={() => handleAddItem()}
                        className="btn btn-primary">
                        <i className={`fa fa-plus`} />
                      </button>
                    </span>
                  </div>
                </div>
              </Row>
            </Column>
            <Column col="12" style={{ padding: '0' }}>
              <GridItems items={gridList} />
            </Column>
          </div>
        </Panel>
        <Row>
          <Column col="12">
            <Button
              htmlType="button"
              onClick={() => handleSendOrder()}
              className="pull-right btn btn-primary"
              type="primary">
              Salvar <i className="fa fa-check ml-1"></i>
            </Button>
          </Column>
        </Row>
      </Content>
    </Suspense>
  );
};

export default OrdersRequest;
