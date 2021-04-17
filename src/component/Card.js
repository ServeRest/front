import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddToCartButton from './AddToCartButton';
import imagemSemFoto from '../imagens/semimagem.jpeg'


class Card extends React.Component {
  validarImagem = (imagem) =>  {
    if (imagem === 0 || imagem === null || imagem === undefined) {
      return imagemSemFoto 
    } else {
      return imagem
    }  
  }

  render() {
    const { product } = this.props;
    const { product: { image, nome, preco, _id, quantidade, descricao } } = this.props;
    return (

      <div className="card col-3">
          <div className="card-body" key={ product._id }>
            <Link
              data-testid="product-detail-link"
              to={ { pathname: `/detalhesProduto/${product._id}`, state: { product } } }
            >
              <img className="imagem" src={ this.validarImagem(product.image) }/>
            </Link>
            <br />
            <h5 className="card-title negrito">{ product.nome }</h5>
            <h6 className="card-subtitle mb-2 text-muted negrito">Preço: </h6>
            <h6 className="card-subtitle mb-2 text-muted">$ { product.preco }</h6>
            <br></br>
            <div>
              <Link
                data-testid="product-detail-link"
                to={ { pathname: `/detalhesProduto/${product._id}`, state: { product } } }
              >
                <a className="card-link" >Detalhes</a>
              </Link>
              <br></br>
              <AddToCartButton product={ product } />
            </div>
          </div>
        </div>
    );
  }
}

Card.propTypes = {
  product: PropTypes.shape({
    nome: PropTypes.string,
    image: PropTypes.string,
    preco: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default Card;
