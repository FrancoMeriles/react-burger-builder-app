import React from "react";
import classes from "./NavigationItems.module.css";

import NagitationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NagitationItem link="/">Burger Builder</NagitationItem>
    {props.isAuth ? (
      <NagitationItem link="/orders">Orders</NagitationItem>
    ) : null}
    {!props.isAuth ? (
      <NagitationItem link="/auth">Login</NagitationItem>
    ) : (
      <NagitationItem link="/logout">Logout</NagitationItem>
    )}
  </ul>
);

export default navigationItems;
