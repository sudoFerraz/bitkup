import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";
import { Header, Footer, Sidebar } from "components";
import Web3Service from 'services/Web3Service';


import dashboardRoutes from "routes/dashboard.jsx";

import appStyle from "assets/jss/material-dashboard-react/appStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

const switchRoutes = (web3Loaded) => (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} web3Loaded={web3Loaded}/>;
    })}
  </Switch>
);

class App extends React.Component {

  state = {
    mobileOpen: false,
    web3Loaded: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== "/maps";
  }

  async componentDidMount() {
    if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }

    try {
      await (new Web3Service()).load()
      this.setState({ web3Loaded: true })
    } catch (e) {
      this.setState({ web3Loaded: false })
    }
  }

  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }

  isWeb3Loaded() {
    return this.state.web3Loaded === true
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"BITKUP"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            additionalMessage={this.isWeb3Loaded() ? '' : 'We faced issues to load Web3 in your browser, please install an provider and select an account'}
            color={this.isWeb3Loaded() ? null : 'danger'}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            { (this.isWeb3Loaded()) ?
              (this.getRoute()) ? (
                <div className={classes.content}>
                  <div className={classes.container}>{switchRoutes(this.isWeb3Loaded())}</div>
                </div>
              ) : (
                <div className={classes.map}>{switchRoutes(this.isWeb3Loaded())}</div>
              )
              : ``
            }
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
