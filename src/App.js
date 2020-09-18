import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './services/history';
import 'bootswatch/dist/minty/bootstrap.min.css';
import CadastroUsuario from './views/registerUser';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={ history }>
        <Switch>
          <Route exact path="/cadastrousuarios" component={ CadastroUsuario } />
          <Route exact path="/" render={ () => history.push('/cadastrousuarios') } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
