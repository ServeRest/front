import React from 'react';
import 'bootswatch/dist/minty/bootstrap.min.css';
import SuccessAlert from '../component/alert'
import ErrorAlert from '../component/errorAlert'
import LinkButton from '../component/linkButton';
import { validateLogin, login } from '../services/validateUser';
import logo1 from '../imagens/serverestlogo1.png'
import '../styles/registerUser.css';
import { registerUser } from '../services/users';

const estadoInicial = { nome: '', email: '', password: '', administrador: 'false'}

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      email: '',
      password: '',
      administrador: 'false',
      errors: '',
      success: '',
      msg_error: [],
      msg_success: [],
    }
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = e => {
    e.preventDefault();
    registerUser(this.state.name, this.state.email, this.state.password, this.state.administrador)
    .then((response) => {
      localStorage.setItem('serverest/userEmail', this.state.email);
      localStorage.setItem('serverest/userPassword', this.state.password);
      const emailUser = localStorage.getItem('serverest/userEmail');
      const passwordUser = localStorage.getItem('serverest/userPassword');
      const tokenUser = localStorage.getItem('serverest/userToken');
      this.setState({ success: response.data.message });
      this.setState({ msg_success: this.state.success });
      this.setState({ success: response.data.message });
      this.setState(estadoInicial);
      login(emailUser, passwordUser);
      setTimeout(() => {
        validateLogin(emailUser);
      }, 3000);
    })
    .catch(error => {
      this.setState({errors: error.response.data });
      const allErrors = Object.values(this.state.errors);
      this.setState({msg_error: allErrors});
      this.setState(estadoInicial);
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked.toString() : target.value.toString();
    value === true ? this.setState({ administrador: value }) : this.setState({ administrador: value });
  }

  render() {
    const { nome, email, password, administrador, success, msg_success } = this.state;
    return (
      <div className="register-page">
        <form onSubmit={ this.submitHandler }>
           <div className="form">
           <img className="imagem" src={ logo1 } width="200" height="200" />
          <h2 className="font-robot">Cadastro </h2>
          { msg_success !== "Cadastro realizado com sucesso" ? null : <SuccessAlert name={ msg_success } display={ this.state.display }></SuccessAlert>}
          { this.state.msg_error.map((item, index)=> {
            return <ErrorAlert name={ item } key={index} display={ this.state.display }></ErrorAlert>;
          }) }
            <input
              type="text"
              className="form-control"
              placeholder="Digite seu nome"
              data-testid="nome"
              name="nome" value={ nome }
              onChange={this.changeHandler}></input>
            <br></br>
            <input type="email"
              className="form-control"
              placeholder="Digite seu email"
              name="email" value={ email }
              data-testid="email"
              onChange={this.changeHandler}></input>
            <br></br>
            <input type="password"
              className="form-control"
              placeholder="Digite sua senha"
              name="password" value={ password }
              data-testid="senha"
              onChange={this.changeHandler}></input>
            <br></br>
            <div className="form-check disabled">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox" value={ administrador }
                  disabled=""
                  data-testid="checkbox"
                  onChange={this.handleInputChange}></input>
                  Cadastrar como Administrador
              </label>
            </div>
            <br />
            <button data-testid="cadastrar" type="submit" className="btn btn-primary">Cadastrar</button>
            <br></br>
            <p className="message">Já é cadastrado?
              <LinkButton dataTestId="entrar" text="Entrar" route="/login"></LinkButton>
            </p>
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterUser;
