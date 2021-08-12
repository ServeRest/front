import React from 'react';
import Navbar from '../../component/navbarAdmin';
import { validateToken } from '../../services/validateUser';
import 'bootswatch/dist/minty/bootstrap.min.css';
import { getAllProducts, deleteProductById } from '../../services/products';

class ShowUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    validateToken();

    getAllProducts()
    .then((response) => {
      const produtos = response.data;
      this.setState({ products: produtos.produtos });
    });
  }

  removeProduct(id) {
    deleteProductById(id).then(res => { window.location.reload(); })
  }

  renderRows() {
    const { products } = this.state;
    return products.map((product) => {
      return (
        <tr key={ product._id }>
          <td>{ product.nome }</td>
          <td>{ product.preco }</td>
          <td>{ product.descricao }</td>
          <td>{product.quantidade }</td>
          <td>{ product.imagem }</td>
          <td>
            <div className="row center">
              <button type="button" className="btn btn-info">Editar</button>
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={ () => this.removeProduct(product._id) }>
                Excluir
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  renderTable() {
    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Preço</th>
              <th scope="col">Descrição</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Imagem</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            { this.renderRows() }
          </tbody>
        </table>
      </>
    );
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="jumbotron">
          <h1>
            Lista dos Produtos
          </h1>
          <hr className="my-4" />
          <p className="row">
            { this.renderTable() }
          </p>
        </div>
      </>
    );
  }
}

export default ShowUsers;
