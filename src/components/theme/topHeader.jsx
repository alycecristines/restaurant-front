import { Button, notification } from 'antd';
import $ from 'jquery';
import React, { Component } from 'react';
import { smoothlyMenu } from './helpers/helpers';

class TopHeader extends Component {
  toggleNavigation(e) {
    e.preventDefault();
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

  openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        className="btn btn-primary"
        type="primary"
        onClick={() => {
          notification.close(key);
        }}>
        Sim, eu tenho certeza!
      </Button>
    );
    notification.open({
      message: 'Saída',
      description: 'Tem certeza que deseja sair?',
      className: 'notification-info',
      btn,
      key,
    });
  };

  render() {
    let hrefLink = '#';
    return (
      <div className="row">
        <nav className="navbar navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
          <div className="navbar-header">
            <a
              className="navbar-minimalize minimalize-styl-2 menu-btn"
              onClick={(e) => this.toggleNavigation(e)}
              href={hrefLink}>
              <i className="fa fa-bars" />{' '}
            </a>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <a onClick={() => this.openNotification()} href={hrefLink}>
                <i className="fa fa-sign-out" /> Sair
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default TopHeader;
