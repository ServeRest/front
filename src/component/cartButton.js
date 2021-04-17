import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart} from "react-icons/fa";
import '../styles/carbutton.css';

export class CartButton extends Component {
  render() {
    const { cartSize } = this.props;
    return (
      <Link to="/minhaListaDeProdutos" data-testid="shopping-cart-button" className="cart-size">
        <span data-testid="listaProdutos" className="cart-size">{cartSize}</span>
        <FaShoppingCart />
      </Link>
    );
  }
}

export default CartButton;
