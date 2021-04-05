import React from 'react';

const Box = ({ col, title, description, amount, amountDescription }) => {
  return (
    <div className={`col-md-${col}`}>
      <div className="ibox">
        <div className="ibox-title">
          <span className="label label-info pull-right">{title}</span>
          <h5>{description}</h5>
        </div>
        <div className="ibox-content">
          <h1 className="no-margins" style={{ color: '#4339F2' }}>
            {amount}
          </h1>
          <small>{amountDescription}</small>
          <div className="pull-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Box;
