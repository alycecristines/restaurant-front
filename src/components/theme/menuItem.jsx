import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = props => {
  return (
    <li>
      <Link to={props.path}>
        {props.icon && <i className={`fa fa-${props.icon}`} />}
        {props.tree ? props.label : <span className="nav-label">{props.label}</span>}
      </Link>
    </li>
  );
};

export default MenuItem;
