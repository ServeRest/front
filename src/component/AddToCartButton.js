import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cart from '../services/cart';
import '../styles/addToCartButton.css';

function AddToCartButton({ product }) {
  return (
    <Link
      data-testid="product-detail-link"
      to={{ pathname: '/minhaListaDeProdutos' }}
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

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    nome: PropTypes.string,
    imagem: PropTypes.string,
    preco: PropTypes.number,
    _id: PropTypes.string,
    descricao: PropTypes.string,
  }).isRequired,
};

export default AddToCartButton;
