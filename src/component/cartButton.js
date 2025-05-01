import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/carbutton.css';

function CartButton({ cartSize }) {
  return (
    <Link to="/minhaListaDeProdutos" data-testid="shopping-cart-button" className="cart-size">
      <span data-testid="listaProdutos" className="cart-size">{cartSize}</span>
      <FaShoppingCart />
    </Link>
  );
}

CartButton.propTypes = {
  cartSize: PropTypes.number,
};

CartButton.defaultProps = {
  cartSize: 0,
};

export default CartButton;
