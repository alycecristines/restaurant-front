import React, { useEffect } from 'react';
import $ from 'jquery';
import { Router } from 'react-router-dom';
import history from '../../helpers/history';
import Routes from '../../routes';

import Progress from './progress';
import Navigation from './navigation';
import TopHeader from './topHeader';
import Footer from './footer';

import './assets/dependencies';
import { correctHeight, detectBody } from './helpers/helpers';
import { useSelector } from 'react-redux';

const Main = () => {
  const isLogged = useSelector(state => state.login.isLogged);
  useEffect(() => {
    $(window).bind('load resize', function () {
      correctHeight();
      detectBody();
    });
  }, []);

  if (isLogged)
    return (
      <div id="wrapper skin-1">
        <Router history={history}>
          <div>
            <Progress />
            <Navigation />
            <div id="page-wrapper" className="gray-bg">
              <TopHeader />
              <Routes />
              <Footer />
            </div>
          </div>
        </Router>
      </div>
    );

  return (
    <div className="bg-login skin-1">
      <Router history={history}>
        <Routes />
      </Router>
    </div>
  );
};

export default Main;
