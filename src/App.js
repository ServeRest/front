import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
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
import ProductDetails from './views/client/productDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/admin/home" element={<Home />} />
        <Route exact path="/admin/cadastrarusuarios" element={<RegisterUser />} />
        <Route exact path="/admin/cadastrarprodutos" element={<RegisterProducts />} />
        <Route exact path="/admin/listarusuarios" element={<ShowUsers />} />
        <Route exact path="/admin/listarprodutos" element={<ShowProducts />} />
        <Route exact path="/admin/relatorios" element={<Report />} />
        <Route exact path="/home" element={<HomeClient />} />
        <Route exact path="/cadastrarusuarios" element={<CadastroUsuario />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Login />} />
        <Route path="/minhaListaDeProdutos" element={<ListCart />} />
        <Route path="/carrinho" element={<Checkout />} />
        <Route path="/detalhesProduto/:id" render={(routeProps) => <ProductDetails routeProps={routeProps} />} />
      </Routes>
    </div>
  );
}

export default App;
