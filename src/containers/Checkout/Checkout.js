import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    //console.log(query.entries());
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //console.log(param, param[0]);
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, price: price });
  }
  // componentDidMount() {
  //   console.log(this.props);
  //   this.setState({ ingredients: this.props.location.ingredients });
  // }
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    // let test = <div>Loading..</div>;
    // if (this.state.ingredients) {
    //   test = (
    // <CheckoutSummary
    //   checkoutCanceled={this.checkoutCanceledHandler}
    //   checkoutContinued={this.checkoutContinuedHandler}
    //   ingredients={this.state.ingredients}
    // />
    //   );
    // }
    // return <div>{test}</div>;
    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={props => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              price={this.state.price}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
