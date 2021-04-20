import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../../services/cart';
import Navbar from '../../component/navbarClient';
import imagemSemFoto from '../../imagens/semimagem.jpeg'
import { validateToken } from '../../services/validateUser';
import '../../styles/homeClient.css';

class ShoppingCart extends React.Component {
  componentDidMount() {
    validateToken();
  }

  validarImagem = (imagem) =>  {
    if (imagem === undefined || imagem === null || imagem === 0) {
      return imagemSemFoto 
    } else {
      return imagem
    }  
  }

  getTotalValue() {
    const productArray = Cart.getItemsFromLocalStorage();
    let totalValue = 1 - 1;
    productArray.forEach((product) => {
      totalValue += (product.preco * product.amount);
    });
    return totalValue;
  }

  removeProduct(product) {
    if (product.amount > 1) {
      Cart.removeItem(product._id);
    } else {
      Cart.deleteItem(product._id);
    }
  }

  addProduct(product) {
    Cart.addItem(product);
  }

  render() {
    const produtos = Cart.getItemsFromLocalStorage();
    return (
      produtos.length < 1
        ? (
          <>
          <Navbar />
          <div className="jumbotron">
            <Link to="/home">
              <button data-testid="paginaInicial" className="btn btn-primary">Página Inicial</button>
            </Link>
            <h1>Lista de Compras</h1>
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          </div>
          </>
        )
        : (
          <>
          <Navbar />
          <div>
            <div className="jumbotron">
              <Link to="/home">
              <button data-testid="paginaInicial" className="btn btn-primary">Página Inicial</button>
              </Link>
              <h1>Lista de Compras</h1>
              <Link to="/carrinho">
                <button
                  data-testid="checkout-products"
                  type="button"
                  data-testid="adicionar carrinho"
                  className="btn btn-primary"
                >
                  Adicionar no carrinho
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-primary"
                data-testid="limparLista"
                onClick={ () => { Cart.removeAll(); this.forceUpdate(); } }
              >
                Limpar Lista
              </button>
              <br />
              <br />
              <br />
              <div className="container-fluid">
                <div className="">
                  <div className="col-12"></div>
                  <section className="row espacamento">
                    { produtos.map((element) => (
                      <div className="card col-3">
                        <div className="card-body" key={ element._id }>
                          <div data-testid="shopping-cart-product-name">
                            Produto:
                            {element.nome}
                          </div> 
                          <div>
                            <p>
                              Preço R$
                              {(element.preco * element.amount)}
                            </p>
                            <div data-testid="shopping-cart-product-quantity">
                              <p>
                                Total: {element.amount}
                              </p>
                            </div>
                            <img 
                              className="imagem" 
                              src={ this.validarImagem(element.image) } 
                              alt={ element.nome } 
                            />
                          </div> 
                          <br />
                          <div className="row">
                            <div className="col-3"></div>
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-testid="product-decrease-quantity"
                                onClick={ () => { this.removeProduct(element); this.forceUpdate(); } }
                              >
                                -
                              </button>
                              <div className="col-3">
                                <p>
                                  {element.amount}
                                </p>
                              </div>
                              <button
                                type="button"
                                data-testid="product-increase-quantity"
                                className="btn btn-primary"
                                onClick={ () => { this.addProduct(element); this.forceUpdate(); } }
                              >
                                +
                              </button>
                          </div>
                      </div>
                   </div>
              ))} 
                  </section>
                </div>
                </div>
            </div>
          </div>
          </>
        ));
  }
}

export default ShoppingCart;
