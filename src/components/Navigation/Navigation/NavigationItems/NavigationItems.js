import React from "react";
import classes from "./NavigationItems.module.css";

import NagitationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NagitationItem link="/">Burger Builder</NagitationItem>
    <NagitationItem link="/orders">Orders</NagitationItem>
  </ul>
);

export default navigationItems;
