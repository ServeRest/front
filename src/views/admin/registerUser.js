import Navbar from '../../component/navbarAdmin'
import React from 'react';
import 'bootswatch/dist/minty/bootstrap.min.css';
import ErrorAlert from '../../component/errorAlert';
import { validateToken } from '../../services/validateUser';
import history from '../../services/history';
import { registerUser } from '../../services/users';

const estadoInicial = { nome: '', email: '', password: '', administrador: 'false' }

class RegisterUsers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      administrador: 'false',
      errors: '',
      msg_error: []
    }
  }

  componentDidMount() {
    validateToken();
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = e => {
    e.preventDefault();
    registerUser({
        nome: this.state.name,
        email: this.state.email,
        password: this.state.password,
        administrador: this.state.administrador,
      })
      .then((response) => {
        history.push('/admin/listarusuarios');
      })
      .catch(error => {
        this.setState({ errors: error.response.data });
        const allErrors = Object.values(this.state.errors);
        this.setState({ msg_error: allErrors });
      })
    this.setState(estadoInicial);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked.toString() : target.value.toString();
    value === true ? this.setState({ administrador: value }) : this.setState({ administrador: value });
  }
    
  render() {
    const { name, email, password, administrador } = this.state;
    return (
      <div>
        <Navbar></Navbar>
        <form className="jumbotron" onSubmit={ this.submitHandler }>
            { this.state.msg_error.map((item , index)=> {
              return <ErrorAlert name={ item } key={ index } display={ this.state.display }></ErrorAlert>;
            }) }
          <h1>Cadastro de usuários</h1>
          <hr className="my-4"></hr>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="form-group">
                <p class="text-left">Nome: *</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite seu nome"
                  data-testid="nome"
                  name="name" value={ name }
                  onChange={ this.changeHandler }>
                </input>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="form-group">
                <p class="text-left">Email: *</p>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Digite seu email"
                  data-testid="email"
                  name="email" value={ email }
                  onChange={ this.changeHandler }>
                </input>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="form-group">
                <p class="text-left">Senha: *</p>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Digite sua senha"
                  data-testid="senha"
                  name="password" value={ password }
                  onChange={ this.changeHandler }>
                </input>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="form-group">
                <div className="form-group form-check disabled">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      value={ administrador }
                      disabled=""
                      data-testid="checkbox"
                      onChange={ this.handleInputChange }>
                    </input>
                    Cadastrar como Administrador
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="form-group">
                <button 
                  type="submit"
                  data-testid="cadastrarUsuario"
                  className="btn btn-primary">
                    Cadastrar
                </button>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </form>
      </div>
      )
    }
  }

export default RegisterUsers;
