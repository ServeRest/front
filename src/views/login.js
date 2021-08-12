import React from 'react';
import ErrorAlert from '../component/errorAlert';
import { validateLogin } from '../services/validateUser';
import LinkButton from '../component/linkButton';
import logo1 from '../imagens/serverestlogo1.png'
import '../styles/login.css';
import { login } from '../services/login';
import {Container, Form, Button, Image} from "react-bootstrap";

const estadoInicial = { email: '', password: '' }

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      errors: {},
      formSubmitted: false,
      msg_error: [],
    }
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    let { formData } = this.state;
    formData[name] = value;
    this.setState({
      formData: formData,
      msg_error: []
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    login(this.state.formData.email, this.state.formData.password)
    .then((response) => {
      localStorage.setItem('serverest/userEmail', this.state.formData.email);
      localStorage.setItem('serverest/userToken', response.data.authorization);
      const emailStorage = localStorage.getItem('serverest/userEmail');
      validateLogin(emailStorage);
    })
    .catch(error => {
      this.setState({
        errors: error.response.data,
        formSubmitted: true,
      });
      const allErrors = Object.values(this.state.errors);
      this.setState({msg_error: allErrors});
      this.setState(estadoInicial);
    });
  }

  render() {

    return (
        <Container className="login-page">
          <Form className="form" onSubmit={ this.handleSubmit }>
            <Image className="imagem" src={ logo1 } width="200" height="200"/>
            <h2 className="font-robot">Login</h2>
            { this.state.msg_error.map((item, index) => {
              return <ErrorAlert name={ item } key={ index }/>;
            })}
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                  data-testid="email"
                  name="email"
                  type="email"
                  placeholder="Digite seu email"
                  onChange={this.handleChange.bind(this)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                  data-testid="senha"
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                  onChange={this.handleChange.bind(this)}/>
            </Form.Group>
            <Button data-testid="entrar" variant="primary" type="submit">
              Entrar
            </Button>
            <Form.Text  className="message" >Não é cadastrado?
              <LinkButton dataTestId="cadastrar" text="Cadastre-se" route="/cadastrarusuarios"/>
            </Form.Text>
          </Form>
        </Container>
    )
  }
}

export default Login;

