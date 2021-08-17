import React from 'react';
import ErrorAlert from '../component/errorAlert';
import {validateLogin} from '../services/validateUser';
import LinkButton from '../component/linkButton';
import logo1 from '../imagens/serverestlogo1.png'
import '../styles/login.css';
import {login} from '../services/login';
import {Container, Form, Button, Image} from "react-bootstrap";

const estadoInicial = {formData: {}}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      errors: {},
      emailError: '',
      passwordError: '',
      messageError: '',
    }
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    let {formData} = this.state;
    formData[name] = value;
    this.setState({
      formData: formData,
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
          emailError: error.response.data.email,
          passwordError: error.response.data.password,
          messageError: error.response.data.message,
        });
        this.setState(estadoInicial);
      });
  }

  getDisplay = (display, type) => {
    if (type === "email") {
      this.setState({emailError: ''})
    }
    if (type === "password") {
      this.setState({passwordError: ''})
    }
    if (type === "message") {
      this.setState({messageError: ''})
    }
  }

  render() {
    return (
      <Container className="login-page">
        <Form className="form" onSubmit={this.handleSubmit}>
          <Image className="imagem" src={logo1} width="200" height="200"/>
          <h1 className="font-robot">Login</h1>
          {this.state.emailError ?
            <ErrorAlert name={this.state.emailError} type={"email"} closed={this.getDisplay}/> : null}
          {this.state.passwordError ?
            <ErrorAlert name={this.state.passwordError} type={"password"} closed={this.getDisplay}/> : null}
          {this.state.messageError ?
            <ErrorAlert name={this.state.messageError} type={"message"} closed={this.getDisplay}/> : null}
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
          <Form.Text className="message">Não é cadastrado?
            <LinkButton dataTestId="cadastrar" text="Cadastre-se" route="/cadastrarusuarios"/>
          </Form.Text>
        </Form>
      </Container>
    )
  }
}

export default Login;

