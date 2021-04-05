/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import $ from 'jquery';
import logo from '../../images/logo.png';
import { smoothlyMenu } from './helpers/helpers';
import MenuItem from './menuItem';
import MenuTree from './menuTree';

class Navigation extends Component {
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

  componentDidMount() {
    const { menu } = this.refs;
    $(function () {
      $(menu).metisMenu({
        toggle: true,
      });
    });
  }

  render() {
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu" ref="menu">
            <li className="nav-header skin-1">
              <div className="dropdown profile-element">
                <img style={{ width: '60%' }} src={logo} alt="logo" />
              </div>
              <div className="logo-element">
                <img style={{ width: '60%' }} src={logo} alt="logo" />
              </div>
            </li>
            <hr className="hr-menu" />

            <MenuItem path="/" icon="home" label="Dashboard" />
            <MenuTree icon="list" label="Cadastros">
              <MenuItem path="/" icon="home" label="Empresas" />
              <MenuItem path="/" icon="home" label="Produtos" />
            </MenuTree>
            <MenuItem path="/" icon="home" label="Pedidos" />
            <MenuItem path="/" icon="home" label="Relatórios" />
            <MenuItem path="/" icon="home" label="Usuários" />
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
