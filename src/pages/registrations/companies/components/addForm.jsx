import React, { useEffect, useState } from 'react';
import { Button, Steps } from 'antd';
import { withRouter } from 'react-router-dom';
import StepOne from './stepOne';
import StepThree from './stepThree';
import StepTwo from './stepTwo';
import { useDispatch, useSelector } from 'react-redux';
import {
  companiesIsDisabledFields,
  companiesSetNextStep,
  companiesSetRecord,
} from '../../../../actions/companiesActions';
import { departmentsSetSearch } from '../../../../actions/departmentsActions';
import history from '../../../../helpers/history';

const { Step } = Steps;

const AddForm = () => {
  const [current, setCurrent] = useState(0);
  const { companiesNextStep } = useSelector(state => state.companies);
  const dispatch = useDispatch();

  useEffect(() => {
    return function cleanup() {
      dispatch([
        companiesSetRecord({}),
        departmentsSetSearch({ description: '', companyId: '' }),
        companiesSetNextStep(false),
        companiesIsDisabledFields(false),
      ]);
    };
  }, []);

  function Step1() {
    return <StepOne />;
  }
  function Step2() {
    return <StepTwo />;
  }
  function Step3() {
    return <StepThree />;
  }

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'Empresa',
      content: Step1,
    },
    {
      title: 'Departamento',
      content: Step2,
    },
    {
      title: 'Colaboradores',
      content: Step3,
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
        {current === 0 && companiesNextStep && (
          <Button type="primary" onClick={() => next()}>
            Próximo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => history.push('/companies')}>
            Finalizar
          </Button>
        )}
      </div>
    </>
  );
};

export default withRouter(AddForm);
