import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.6
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0
    },
    totalPrice: 4,
    purchasebled: false,
    purchasing: false,
    loading: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasebled: sum > 0 });
  }

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAdition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdition;
    //console.log(oldPrice);
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] - 1;
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchasedCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasedContinueHandler = () => {
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Franco Meriles",
        address: {
          street: "Fake Street 123",
          zipCode: "5000",
          country: "Argentina"
        },
        email: "fran@meriles.com"
      },
      deliveryMethod: "fastes"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          purchasing: false
        });
      });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        finalPrice={this.state.totalPrice}
        purchaseCanceled={this.purchasedCancelHandler}
        pruchaseContinue={this.purchasedContinueHandler}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasedCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          purchasebled={this.state.purchasebled}
          disabled={disableInfo}
          price={this.state.totalPrice}
          purchasing={this.state.purchasing}
          order={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
