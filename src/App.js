import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './services/history';
import 'bootswatch/dist/minty/bootstrap.min.css';
import CadastroUsuario from './views/registerUser';
import Home from './views/admin/home';
import Login from './views/login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={ history }>
        <Switch>
          <Route exact path="/admin/home" component={ Home } />
          <Route exact path="/cadastrousuarios" component={ CadastroUsuario } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/" render={ () => history.push('/login') } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
