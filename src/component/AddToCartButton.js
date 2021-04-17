import React from 'react';
import PropTypes from 'prop-types';
import Cart from '../services/cart';
import { Link } from 'react-router-dom';
import '../styles/addToCartButton.css'

class AddToCartButton extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <Link
      data-testid="product-detail-link"
      to={ { pathname: '/minhaListaDeProdutos'} }
      >
      <button
        type="button"
        data-testid="adicionarNaLista"
        className="btn btn-primary"
        onClick={ () => { Cart.addItem(product); } }
      >
        Adicionar a lista
      </button>
      </Link>
    );
  }
}

export default AddToCartButton;

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    nome: PropTypes.string,
    imagem: PropTypes.string,
    preco: PropTypes.number,
    _id: PropTypes.string,
    descricao: PropTypes.string,
  }).isRequired,
};
