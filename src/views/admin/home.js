import React from 'react'
import Navbar from '../../component/navbar'

export default function Home() { 
    return (
        <>
        <Navbar></Navbar>
        <div className="jumbotron">
          <h1>Bem Vindo "por o nome aqui"</h1>
          <p className="lead">Este é seu sistema para administrar seu ecommerce.</p>
          <hr className="my-4"></hr>
          <p className="row">
          <div className="col-md-2" />
              <div className="col-md-2">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Cadastrar Usuários</h5>
                    <p class="card-text">Funcionalidade de cadastro de usuários para ter acesso ao ecommerce.</p>
                    <a href="#" class="btn btn-primary">Cadastrar</a>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Cadastrar Produtos</h5>
                    <p class="card-text">Funcionalidade de cadastro de produtos para ser utilizado no ecommerce.</p>
                    <a href="#" class="btn btn-primary">Cadastrar</a>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Listar Usuários</h5>
                    <p class="card-text">Funcionalidade de listagem de usuários que estão cadastrados.</p>
                    <a href="#" class="btn btn-primary">Listar</a>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Relatórios</h5>
                    <p class="card-text">Funcionalidade de relatórios gerais do sistema de ecommerce.</p>
                    <a href="#" class="btn btn-primary">Ver</a>
                  </div>
                </div>
              </div>
          </p>
        </div>
        </>
    )
}