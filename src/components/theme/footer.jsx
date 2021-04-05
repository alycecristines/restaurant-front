import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer mt-3">
        <div className="row align-items-center">
          <div className="col-md-6" style={{ textAlign: 'left' }}>
            <p className="mb-0">
              Developed by{' '}
              <strong>
                <a href="https://github.com/alycecristines">@alycecristines</a>{' '}
                <i className="fa fa-copyright" />
              </strong>{' '}
              {new Date().getFullYear()}
            </p>
          </div>

          <div className="col-md-6" style={{ textAlign: 'right' }}>
            <img
              style={{ width: '3%', marginTop: '-1%' }}
              src="https://acsmack.blob.core.windows.net/acs/restaurant-project/logo"
              alt="Logo"
            />{' '}
            <strong>Painel Administrativo</strong>
          </div>
        </div>
      </div>
    );
  }
}
