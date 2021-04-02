import React, { Component } from 'react';
import $ from 'jquery';

import { Router } from 'react-router-dom';
import history from '../../helpers/history';
import Routes from '../../routes';
import './assets/dependencies';
import { correctHeight, detectBody } from './helpers/helpers';

class Main extends Component {
  componentDidMount() {
    $(window).bind('load resize', function () {
      correctHeight();
      detectBody();
    });
  }

  render() {
    return (
      <div className="bg-login skin-1">
        <Router history={history}>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default Main;
