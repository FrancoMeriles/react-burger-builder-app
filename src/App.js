import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, Redirect } from "react-router-dom";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
// import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Logout = React.lazy(() => import("./containers/Auth/Logout/Logout"));

class App extends Component {
  componentDidMount() {
    this.props.onAutoSingUp();
  }

  // render() {
  //   let routes = (
  //     <Switch>
  //       <Route path="/auth" component={Auth} />
  //       <Route path="/" exact component={BurgerBuilder} />
  //       <Redirect to="/" />
  //     </Switch>
  //   );

  //   if (this.props.isAuthenticated) {
  //     routes = (
  //       <Switch>
  //         <Route path="/checkout" component={Checkout} />
  //         <Route path="/orders" component={Orders} />
  //         <Route path="/logout" component={Logout} />
  //         <Route path="/auth" component={Auth} />
  //         <Route path="/" exact component={BurgerBuilder} />
  //         <Redirect to="/" />
  //       </Switch>
  //     );
  //   }

  //   return (
  //     <Layout>
  //       <Switch>{routes}</Switch>
  //     </Layout>
  //   );
  // }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Layout>
        <React.Suspense fallback={<Spinner />}>
          <Switch>
            {isAuthenticated && <Route path="/logout" component={Logout} />}
            <Route path="/auth" component={Auth} />
            {isAuthenticated && <Route path="/checkout" component={Checkout} />}
            {isAuthenticated && <Route path="/orders" component={Orders} />}
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </React.Suspense>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSingUp: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
