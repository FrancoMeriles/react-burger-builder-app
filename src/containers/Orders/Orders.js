import React, { Component } from "react";
import Order from "../../components/Order/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
    // axios
    //   .get("/orders.json")
    //   .then(response => {
    //     console.log(response.data);
    //     const fetchedOrders = [];
    //     for (let key in response.data) {
    //       fetchedOrders.push({
    //         ...response.data[key],
    //         id: key
    //       });
    //       console.log(response.data[key]);
    //     }
    //     this.setState({ loading: false, orders: fetchedOrders }, () =>
    //       console.log(this.state.orders)
    //     );
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //   });
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: token => dispatch(actions.fetchOrder(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
