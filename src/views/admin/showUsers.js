import React from 'react';
import Navbar from '../../component/navbarAdmin';
import { validateToken } from '../../services/validateUser';
import 'bootswatch/dist/minty/bootstrap.min.css';
import ErrorAlert from '../../component/errorAlert';
import { deleteUser, getAllUsers } from '../../services/users';

class ShowUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      msg_error: [],
    };
  }

  componentDidMount() {
    validateToken();
    getAllUsers()
    .then((response) => {
      const usuarios = response.data;
      this.setState({ persons: usuarios.usuarios });
    });
  }

  removeUser(id, email) {
    const emailStorage = localStorage.getItem('serverest/userEmail');
    if (email === emailStorage) {
      this.setState( { msg_error: ["Não é possível excluir o próprio usuário!"] } );
    } else {
      deleteUser(id).then(res => { window.location.reload(); });
    }
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
              <button 
                type="button" 
                className="btn btn-danger"  
                onClick={() => this.removeUser(person._id, person.email)}>
                Excluir
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  renderTable() {
    return (
      <>
      <div className="col">
      { this.state.msg_error.map((item, index) => {
          return <ErrorAlert name={ item } key={ index }></ErrorAlert>;
        })}
      </div>
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
