import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

const burger = props => {
  //console.log(props.ingredients);

  let ingredientTransform = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => (
        <BurgerIngredient key={igKey + i} type={igKey} />
      ));
    })
    .reduce((arr, ele) => {
      return arr.concat(ele);
    });

  if (ingredientTransform.length === 0) {
    ingredientTransform = <p>Add ingredients please!</p>;
  }
  //console.log(ingredientTransform);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientTransform}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
