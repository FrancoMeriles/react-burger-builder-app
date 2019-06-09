import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: null
  };
  componentDidMount() {
    console.log(this.props);
    this.setState({ ingredients: this.props.location.ingredients });
  }
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let test = <div>Loading..</div>;
    if (this.state.ingredients) {
      test = (
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}
        />
      );
    }
    return <div>{test}</div>;
  }
}

export default Checkout;
