import React from 'react'
import ButtonLink from '../component/buttonLink'

export default function Navbar(){
    return (
      <nav class="navbar navbar-expand-lg background-navbar">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand text-light" href="#">ServRest</a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
          <ButtonLink dataTestId="home" text="Home" route="/admin/home"></ButtonLink>
          </li>
          <li class="nav-item">
          <ButtonLink dataTestId="cadastrar-usuarios" text="Cadastrar Usuários" route="/admin/cadastrar-usuarios"></ButtonLink>
          </li>
          <li class="nav-item">
          <ButtonLink dataTestId="cadastrar-produtos" text="Cadastrar Produtos" route="/admin/cadastrar-produtos"></ButtonLink>
          </li>
          <li class="nav-item">
          <ButtonLink dataTestId="relatorios" text="Relátorios" route="/admin/relatorios"></ButtonLink>
          </li>
        </ul>
      </div>
    </nav>
    )
}