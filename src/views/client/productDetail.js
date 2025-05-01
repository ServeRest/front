import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddToCartButton from '../../component/AddToCartButton';
import Navbar from '../../component/navbarClient';
import CartButton from '../../component/cartButton';
import imagemSemFoto from '../../imagens/semimagem.jpeg';
import LinkButton from '../../component/linkButton';
import { validateToken } from '../../services/validateUser';
import '../../styles/productDetail.css';

class ProductDetails extends React.Component {
  componentDidMount() {
    validateToken();
  }

  validarImagem = (imagem) => {
    if (!imagem) {
      return imagemSemFoto;
    }
    return imagem;
  };

  renderProductInfo(product) {
    return (
      <div className="col-6">
        <div className="especificacoes">
          <h2 className="title">Detalhes</h2>
          <h4 className="title">{ `R$: ${product.preco}` }</h4>
          <h4 className="title">{ `Quantidade: ${product.quantidade}` }</h4>
          <h4 className="title">{ `Descrição: ${product.descricao}` }</h4>
        </div>
      </div>
    );
  }

  render() {
    const { location: { state: { product } } } = this.props;
    return (
      <>
        <Navbar />
        <div className="jumbotron">
          <h1>Detalhes do produto</h1>
          <Link to="/carrinho">
            <CartButton />
          </Link>
          <hr className="my-4" />
          <div>
            <section className="row espacamentodetail">
              <div className="card col-10">
                <div className="card-body">
                  <br />
                  <div>
                    <h2 className="title" data-testid="product-detail-name">{ product.nome }</h2>
                  </div>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-2" />
                    <div className="col-4">
                      <img className="imagem" src={ this.validarImagem(product.image) } alt={ product.nome } />
                    </div>
                    { this.renderProductInfo(product) }
                  </div>
                  <br />
                  <br />
                  <AddToCartButton product={ product } />
                  <br />
                </div>
                <div>
                  <LinkButton
                    className="card-link"
                    dataTestId="voltarHome"
                    text="Voltar"
                    route="/home"
                  />
                  <br />
                </div>
              </div>
            </section>
            <br />
          </div>
        </div>
      </>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      product: PropTypes.shape({
        nome: PropTypes.string.isRequired,
        image: PropTypes.string,
        preco: PropTypes.number.isRequired,
        descricao: PropTypes.string,
        quantidade: PropTypes.number,
        _id: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
