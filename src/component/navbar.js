import React from 'react';
import ButtonLink from './buttonLink';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg background-navbar">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a className="navbar-brand text-light" href="#">ServRest</a>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <ButtonLink dataTestId="home" text="Home" route="/admin/home" />
          </li>
          <li className="nav-item">
            <ButtonLink dataTestId="cadastrar-usuarios" text="Cadastrar Usuários" route="/admin/cadastrarusuarios" />
          </li>
          <li className="nav-item">
            <ButtonLink dataTestId="cadastrar-produtos" text="Cadastrar Produtos" route="/admin/cadastrarprodutos" />
          </li>
          <li className="nav-item">
            <ButtonLink dataTestId="relatorios" text="Relátorios" route="/admin/relatorios" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
