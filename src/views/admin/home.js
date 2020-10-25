import React from 'react';
import Navbar from '../../component/navbar';
import history from '../../services/history';
import 'bootswatch/dist/minty/bootstrap.min.css';

const redirectPage = (route) => history.push(route);

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: '',
    };
  }

  componentDidMount() {
    this.setState({ nome: localStorage.getItem('@nome-do-app/userNome') });
  }

  render() {
    const { nome } = this.state;
    return (
      <>
        <Navbar />
        <div className="jumbotron">
          <h1>
            Bem Vindo
            {nome}
          </h1>
          <p className="lead">Este é seu sistema para administrar seu ecommerce.</p>
          <hr className="my-4" />
          <p className="row">
            <div className="col-md-2" />
            <div className="col-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Cadastrar Usuários</h5>
                  <p className="card-text">Funcionalidade de cadastro de usuários para ter acesso ao ecommerce.</p>
                  <a className="btn btn-primary" onClick={ () => redirectPage('/admin/cadastrarusuarios') }>Cadastrar</a>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Cadastrar Produtos</h5>
                  <p className="card-text">Funcionalidade de cadastro de produtos para ser utilizado no ecommerce.</p>
                  <a className="btn btn-primary" onClick={ () => redirectPage('/admin/cadastrarprodutos') }>Cadastrar</a>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Listar Usuários</h5>
                  <p className="card-text">Funcionalidade de listagem de usuários que estão cadastrados.</p>
                  <a className="btn btn-primary" onClick={ () => redirectPage('/admin/listarusuarios') }>Listar</a>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Relatórios</h5>
                  <p className="card-text">Funcionalidade de relatórios gerais do sistema de ecommerce.</p>
                  <a className="btn btn-primary" onClick={ () => redirectPage('/admin/relatorios') }>Ver</a>
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
