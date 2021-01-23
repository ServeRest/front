import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart} from "react-icons/fa";

export class ShoppingCartButton extends Component {
  render() {
    const { cartSize } = this.props;
    return (
      <Link to="/shoppingCart" data-testid="shopping-cart-button">
        <span data-testid="shopping-cart-size" className="cart-size">{cartSize}</span>
        <FaShoppingCart />
      </Link>
    );
  }
}

export default ShoppingCartButton;