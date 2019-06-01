import React from "react";
import clasess from "./NavigationItem.module.css";
import classes from "./NavigationItem.module.css";
const navigationItem = props => (
  <li className={clasess.NavigationItem}>
    <a href={props.link} className={props.active ? classes.active : null}>
      {props.children}
    </a>
  </li>
);

export default navigationItem;