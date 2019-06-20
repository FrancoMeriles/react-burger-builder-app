import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionsType from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasebled: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios
    //   .get(`https://burger-react-app-849ee.firebaseio.com/ingredients.json`)
    //   .then(response => {
    //     this.setState({
    //       ingredients: response.data
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasebled: sum > 0 });
  }

  // addIngredientHandler = type => {
  //   const updatedCount = this.state.ingredients[type] + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAdition = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAdition;
  //   //console.log(oldPrice);
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = type => {
  //   const updatedCount = this.state.ingredients[type] - 1;
  //   if (this.state.ingredients[type] <= 0) {
  //     return;
  //   }
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchasedCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasedContinueHandler = () => {
    // this.setState({
    //   loading: true
    // });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Franco Meriles",
    //     address: {
    //       street: "Fake Street 123",
    //       zipCode: "5000",
    //       country: "Argentina"
    //     },
    //     email: "fran@meriles.com"
    //   },
    //   deliveryMethod: "fastes"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     });
    //   });
    //console.log(this.props);
    //Mejor
    // this.props.history.push({
    //   pathname: "/checkout",
    //   ingredients: this.state.ingredients
    // });
    const queryParams = [];
    for (let i in this.state.ingredients) {
      console.log(i);
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push(`price=${this.props.price}`);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: `?${queryString}`
    });
  };

  render() {
    const disableInfo = {
      ...this.props.ings
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>Ingredients can't be load!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            purchasebled={this.state.purchasebled}
            disabled={disableInfo}
            price={this.props.price}
            purchasing={this.state.purchasing}
            order={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          finalPrice={this.props.price}
          purchaseCanceled={this.purchasedCancelHandler}
          pruchaseContinue={this.purchasedContinueHandler}
        />
      );
    }

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
        {burger}
      </Aux>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({ type: actionsType.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: ingName =>
      dispatch({ type: actionsType.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

// export default withErrorHandler(BurgerBuilder, axios);
