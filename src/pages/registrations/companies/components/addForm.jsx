import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import { Button, Steps } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import * as Yup from 'yup';

import Messages from '../../../../helpers/messages';

import DepartmentGrid from './departmentsGrid';
import EmployeesGrid from './employeesGrid';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';

const { Step } = Steps;

const AddForm = () => {
  const [current, setCurrent] = useState(0);
  const [configStep, setConfigStep] = useState({
    step: 0,
    done: false,
  });

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
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Anterior
          </Button>
        )}
        {current < steps.length - 1 && current !== 0 && (
          <Button type="primary" onClick={() => next()}>
            Próximo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Finalizar
          </Button>
        )}
      </div>
    </>
  );
};

export default withRouter(AddForm);
