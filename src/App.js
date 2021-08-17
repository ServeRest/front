import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './services/history';
import CadastroUsuario from './views/registerUser';
import Home from './views/admin/home';
import HomeClient from './views/client/home';
import RegisterProducts from './views/admin/registerProducts';
import RegisterUser from './views/admin/registerUser';
import Report from './views/admin/report';
import ShowUsers from './views/admin/showUsers';
import ShowProducts from './views/admin/showProducts';
import Login from './views/login';
import 'bootswatch/dist/minty/bootstrap.min.css';
import ListCart from './views/client/ListCart';
import Checkout from './views/client/checkout';
import ProductDetails from '../src/views/client/productDetail';

function App() {
  return (
    <div className="App">
      <Router history={ history }>
        <Switch>
          <Route exact path="/admin/home" component={ Home } />
          <Route exact path="/admin/cadastrarusuarios" component={ RegisterUser } />
          <Route exact path="/admin/cadastrarprodutos" component={ RegisterProducts } />
          <Route exact path="/admin/listarusuarios" component={ ShowUsers } />
          <Route exact path="/admin/listarprodutos" component={ ShowProducts } />
          <Route exact path="/admin/relatorios" component={ Report } />
          <Route exact path="/home" component={ HomeClient } />
          <Route exact path="/cadastrarusuarios" component={ CadastroUsuario } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/" render={ () => history.push('/login') } />
          <Route path="/minhaListaDeProdutos" component={ ListCart } />
          <Route path="/carrinho" component={ Checkout } />
          <Route path="/detalhesProduto/:id" render={ (props) => <ProductDetails { ...props } /> } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
