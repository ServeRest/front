import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/navbarAdmin';
import 'bootswatch/dist/minty/bootstrap.min.css';
import { ValidateToken } from '../../services/validateUser';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: '',
    };
  }

  componentDidMount() {
    ValidateToken();
    this.setState({ nome: localStorage.getItem('serverest/userNome') });
  }

  render() {
    const history = useNavigate();
    const redirectPage = (route) => history(route);

    const { nome } = this.state;
    return (
      <>
        <Navbar />
        <div className="jumbotron">
          <h1>
            Bem Vindo
            {' '}
            {nome}
          </h1>
          <p className="lead">Este é seu sistema para administrar seu ecommerce.</p>
          <hr className="my-4" />
          <p className="row">
            <div className="col-md-1" />
            <div className="col-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Cadastrar Usuários</h5>
                  <p className="card-text">Funcionalidade de cadastro de usuários para ter acesso ao ecommerce.</p>
                  <a data-testid="cadastrarUsuarios" className="btn btn-primary" onClick={ () => redirectPage('/admin/cadastrarusuarios') }>Cadastrar</a>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Listar Usuários</h5>
                  <p className="card-text">Funcionalidade de listagem de usuários que estão cadastrados.</p>
                  <a data-testid="listarUsuarios" className="btn btn-primary" onClick={ () => redirectPage('/admin/listarusuarios') }>Listar</a>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Cadastrar Produtos</h5>
                  <p className="card-text">Funcionalidade de cadastro de produtos para ser utilizado no ecommerce.</p>
                  <a data-testid="cadastrarProdutos" className="btn btn-primary" onClick={ () => redirectPage('/admin/cadastrarprodutos') }>Cadastrar</a>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Listar Produtos</h5>
                  <p className="card-text">Funcionalidade de listagem de produtos que estão cadastrados.</p>
                  <a data-testid="listarProdutos" className="btn btn-primary" onClick={ () => redirectPage('/admin/listarprodutos') }>Listar</a>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Relatórios</h5>
                  <p className="card-text">Funcionalidade de relatórios gerais do sistema de ecommerce.</p>
                  <a data-testid="relatorios" className="btn btn-primary" onClick={ () => redirectPage('/admin/relatorios') }>Ver</a>
                </div>
              </div>
            </div>
          </p>
        </div>
      </>
    );
  }
}

export default Home;
