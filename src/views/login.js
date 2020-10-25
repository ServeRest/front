import React from 'react';
import axios from 'axios';
import 'bootswatch/dist/minty/bootstrap.min.css';
import ErrorAlert from '../component/errorAlert';
import { validateLogin } from '../services/validateUser';
import LinkButton from '../component/linkButton';
const estadoInicial = { email: '', password: '' }

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: '',
      msg_error: [],
    }
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = e => {
    e.preventDefault();
    axios
      .post('https://api.serverest.dev/login', {
        email: this.state.email,
        password: this.state.password,
       })
      .then((response) => {
        localStorage.setItem('@nome-do-app/userEmail', this.state.email);
        localStorage.setItem('@nome-do-app/userToken', response.data.authorization);
        const emailStorage = localStorage.getItem('@nome-do-app/userEmail');
        validateLogin(emailStorage);
      })
      .catch(error => {
        this.setState({errors: error.response.data });
        const allErrors = Object.values(this.state.errors);
        this.setState({msg_error: allErrors});
        this.setState(estadoInicial);
      });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-page">
        { this.state.msg_error.map((item, index) => {
          return <ErrorAlert name={ item } key={ index } display={ this.state.display }></ErrorAlert>;
        })}
        <form onSubmit={ this.submitHandler }>
          <div className="form">
          <h1 className="text-success">ServeRest</h1>
          <br></br>
          <h2 className="font-robot">Login</h2>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu email"         
              name="email" value={ email }
              onChange={this.changeHandler}></input>
            <br></br>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              name="password" value={ password }
              onChange={this.changeHandler}></input>
            <br></br>
            <button type="submit" className="btn btn-primary">Entrar</button>
            <p 
              className="message">Não é cadastrado?
              <LinkButton dataTestId="cadastrar" text="Cadastre-se" route="/cadastrarusuarios"></LinkButton>
            </p>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;
