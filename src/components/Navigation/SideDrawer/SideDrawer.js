import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";

import classes from "./SideDrawer.module.css";

import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const sideDrawer = props => {
  let attachedClases = [classes.SideDrawer, classes.Close];

  if (props.open) {
    attachedClases = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClases.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
