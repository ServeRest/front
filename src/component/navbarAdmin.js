import React from 'react';
import ButtonLink from './buttonLink';
import history from '../services/history';
import '../styles/navbar.css';
import logo1 from '../imagens/serverestlogo1branco.png'

export default function NavbarAdmin() {

  const submitHandler = e => {
    localStorage.clear();
    history.push('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg background-navbar">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <img className="imagem" src={ logo1} width="100" height="65"/>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <ButtonLink dataTestId="home" text="Home" route="/admin/home" />
          </li>
          <li className="nav-item">
            <ButtonLink dataTestId="cadastrar-usuarios" text="Cadastrar Usuários" route="/admin/cadastrarusuarios" />
          </li>
          <li className="nav-item">
            <ButtonLink dataTestId="listar-usuarios" text="Listar Usuários" route="/admin/listarusuarios" />
          </li>
          <li className="nav-item">
            <ButtonLink dataTestId="cadastrar-produtos" text="Cadastrar Produtos" route="/admin/cadastrarprodutos" />
          </li>
          <li className="nav-item">
            <ButtonLink dataTestId="listar-produtos" text="Listar Produtos" route="/admin/listarprodutos" />
          </li>
          <li className="nav-item">
            <ButtonLink dataTestId="link-relatorios" text="Relatórios" route="/admin/relatorios" />
          </li>
        </ul>
        <form onClick={ submitHandler }>
          <button data-testid="logout" class=" my-2 my-sm-0 btn btn-info" type="button">Logout</button>
        </form>
      </div>
    </nav>
  );
}
