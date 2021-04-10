import React from 'react';
import axios from 'axios';
import Navbar from '../../component/navbarClient';
import SearchBox from '../../component/searchBox';
import { BsArrowDown, BsArrowUp} from "react-icons/bs";
import ShoppingCartButton from '../../component/cartButton';
import { validateToken } from '../../services/validateUser';
import '../../App.css';
import imagemSemFoto from '../../imagens/semimagem.jpeg'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  productsDetail = (imagem, nome, preco, quantidade, descricao) => {
    localStorage.setItem('serverest/imagemProduto', imagem);
    localStorage.setItem('serverest/nomeProduto', nome);
    localStorage.setItem('serverest/precoProduto', preco);
    localStorage.setItem('serverest/quantidadeProduto', quantidade);
    localStorage.setItem('serverest/descricaoProduto', descricao);
  }

  validarImagem = (imagem) =>  {
    if (imagem === 0 || imagem === null || imagem === undefined) {
      console.log(imagem)
      return imagemSemFoto 
    } else {
      console.log(imagem)
      return imagem
    }  
  }

  componentDidMount() {
    validateToken();
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('serverest/userToken'),
      },
    };

    axios
      .get('https://serverest.dev/produtos', config)
      .then((response) => {
        const produtos = response.data;
        this.setState({ products: produtos.produtos });
      });
  }

  renderRows() {
    const { products } = this.state;
    return products.map((product) => {
      return (
        <div className="card col-3">
          <div className="card-body" key={ product._id }>
            <img className="imagem" src={ this.validarImagem(product.image) }/>
            <br />
            <h5 className="card-title negrito">{ product.nome }</h5>
            <h6 className="card-subtitle mb-2 text-muted negrito">Preço: </h6>
            <h6 className="card-subtitle mb-2 text-muted">$ { product.preco }</h6>
            <br></br>
            <div>
            <a href={'productDetail/' + product._id} class="card-link" onClick={() => this.productsDetail(product.image, product.nome, product.preco, product.quantidade, product.descricao)}>Detalhes</a>
            <br></br>
            <a href="#" class="card-link">Adicionar ao Carrinho</a>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="jumbotron">
          <h1>Serverest Store <ShoppingCartButton/></h1>
          <div className="row col-12">
          <div className="col-2"></div>
            <SearchBox />
            <div className="col-4">
              <form className="form-control-lg">
                <button
                  type="button"
                  className="btn btn-info mx-2 my-2 my-sm-0"
                  onClick={() => this.searchProductsSorted('price_asc')}
                >
                  Menor Preço <BsArrowDown />
                </button>
                <button
                  type="button"
                  className="btn btn-info mx-2 my-2 my-sm-0"
                  /* onClick={() => this.searchProductsSorted('price_desc')} */
                >
                  Maior Preço <BsArrowUp />
                </button>
              </form>
            </div>
          </div>
          <hr className="my-4" />
          <h4>Produtos</h4>
          <div className="container-fluid">
            <div className="">
              <div className="col-12"></div>
              <section className="row espacamento">
              {this.renderRows()}
              </section>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
