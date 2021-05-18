import React, { useEffect, useState } from 'react';
import { Button, Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { productsIsDisabledFields, productsSetNextStep } from '../../../../actions/productsActions';
import { variationsSetSearch } from '../../../../actions/variationsActions';
import history from '../../../../helpers/history';
import StepOne from './stepOne';
import StepTwo from './stepTwo';

const { Step } = Steps;

const AddForm = () => {
  const [current, setCurrent] = useState(0);
  const { productNextStep } = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    return function cleanup() {
      dispatch([
        productsIsDisabledFields(false),
        variationsSetSearch({ description: '' }),
        productsSetNextStep(false),
      ]);
    };
  }, []);

  function Step1() {
    return <StepOne />;
  }
  function Step2() {
    return <StepTwo />;
  }

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'Produto',
      content: Step1,
    },
    {
      title: 'Variações',
      content: Step2,
    },
  ];

  return (
    <>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ marginTop: 30 }}>
        {steps[current].content()}
      </div>
      <div className="steps-action">
        {current > 1 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Anterior
          </Button>
        )}
        {current < steps.length - 1 && current !== 0 && (
          <Button type="primary" onClick={() => next()}>
            Próximo
          </Button>
        )}
        {current === 0 && productNextStep && (
          <Button type="primary" onClick={() => next()}>
            Próximo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => history.push('/products')}>
            Finalizar
          </Button>
        )}
      </div>
    </>
  );
};

export default withRouter(AddForm);
