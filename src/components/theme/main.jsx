import React, { useEffect } from 'react';
import $ from 'jquery';
import { Router } from 'react-router-dom';
import history from '../../helpers/history';
import Routes from '../../routes';
import './assets/dependencies';
import { correctHeight, detectBody } from './helpers/helpers';

const Main = () => {
  useEffect(() => {
    $(window).bind('load resize', function () {
      correctHeight();
      detectBody();
    });
  }, []);

  return (
    <div className="bg-login skin-1">
      <Router history={history}>
        <Routes />
      </Router>
    </div>
  );
};

export default Main;
