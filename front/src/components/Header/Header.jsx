import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  AppBar,
  Toolbar
} from "material-ui";
import cx from "classnames";

import headerStyle from "assets/jss/material-dashboard-react/headerStyle.jsx";

function Header({ ...props }) {
  
  function getRouteName() {
    var name;
    props.routes.map((prop, key) => {
      if (prop.path === props.location.pathname) {
        name = prop.navbarName;
      }
      return null;
    });
    return name;
  }

  function makeTitle() {
    const name = getRouteName()
    return (props.additionalMessage) ? `${name} - ${props.additionalMessage}` : name
  }

  const { classes, color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {makeTitle()}
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  additionalMessage: PropTypes.string,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
