import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <li>
    <Link to={props.path}>
      {props.icon && <i className={`hbi hbi-${props.icon}`} />}
      {props.tree ? props.label : <span className="nav-label">{props.label}</span>}
    </Link>
  </li>
);
