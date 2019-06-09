import React from "react";
import clasess from "./NavigationItem.module.css";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = props => (
  <li className={clasess.NavigationItem}>
    <NavLink exact to={props.link} activeClassName={clasess.active}>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
