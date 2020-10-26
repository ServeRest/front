import React from 'react';
import axios from 'axios';
import Navbar from '../../component/navbarAdmin';
import { validateToken } from '../../services/validateUser';
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
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
      },
    };

    axios
      .get('https://serverest.dev/usuarios', config)
      .then((response) => {
        const usuarios = response.data;
        this.setState({ persons: usuarios.usuarios });
      });
  }

  renderRows() {
    const { persons } = this.state;
    return persons.map((person) => {
      return (
        <tr key={ person._id }>
          <td>{ person.nome }</td>
          <td>{ person.email }</td>
          <td>{ person.password }</td>
          <td>{ person.administrador }</td>
          <td>
            <div className="row center">
              <button type="button" className="btn btn-info">Editar</button>
              <button type="button" className="btn btn-danger">Excluir</button>
            </div>
          </td>
        </tr>
      );
    });
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
    );
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
