import React from 'react';
import axios from 'axios';
import Navbar from '../../component/navbar';
import { validateToken } from '../../services/validateAccessPages';
import 'bootswatch/dist/minty/bootstrap.min.css';

class ShowUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
    };
  }

  componentDidMount() {
    validateToken();
    var config = {
      headers: {'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json'}
    };

    axios
      .get(`https://api.serverest.dev/usuarios`, config )
      .then(res => {
        const usuarios = res.data;
        console.log(res.data);
        this.setState({ persons: usuarios.usuarios });
      });
  }

  renderRows() {
    const { persons } = this.state
    return persons.map(person => {
       return (
         <tr key={person._id}>
           <td scope="col">{person.nome}</td>
           <td scope="col">{person.email}</td>
           <td scope="col">{person.password}</td>
           <td scope="col-2">{person.administrador}</td>
           <td scope="col">
             <div className="row center">
              <button className="btn btn-info">Editar</button>
              <button className="btn btn-danger">Excluir</button>
              </div>
           </td>
         </tr>
       )
    })
  }

  renderTable() {
    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Senha</th>
              <th scope="col">Administrador</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            { this.renderRows() }
          </tbody>
        </table>
      </>
    )
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="jumbotron">
          <h1>
            Lista dos usuários
          </h1>
          <hr className="my-4" />
          <p className="row">
          { this.renderTable() }
          </p>
        </div>
      </>
    );
  }
}

export default ShowUsers;
