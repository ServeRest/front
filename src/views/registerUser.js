import React from 'react';
import 'bootswatch/dist/minty/bootstrap.min.css';
import SuccessAlert from '../component/alert'
import ErrorAlert from '../component/errorAlert'
import LinkButton from '../component/linkButton';
import {validateLogin, login} from '../services/validateUser';
import logo1 from '../imagens/serverestlogo1.png'
import '../styles/registerUser.css';
import {registerUser} from '../services/users';
import {Button, Container, Form, Image} from "react-bootstrap";

const estadoInicial = {formData: {}}

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      administrador: false,
      nomeError: '',
      emailError: '',
      passwordError: '',
      messageError: ''
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

  submitHandler = e => {
    e.preventDefault();
    registerUser({
      nome: this.state.formData.nome,
      email: this.state.formData.email,
      password: this.state.formData.password,
      administrador: this.state.administrador.toString(),
    })
      .then((response) => {
        localStorage.setItem('serverest/userEmail', this.state.formData.email);
        localStorage.setItem('serverest/userPassword', this.state.formData.password);
        const emailUser = localStorage.getItem('serverest/userEmail');
        const passwordUser = localStorage.getItem('serverest/userPassword');
        const tokenUser = localStorage.getItem('serverest/userToken');
        this.setState({success: response.data.message});
        this.setState({msg_success: this.state.success});
        this.setState({success: response.data.message});
        this.setState(estadoInicial);
        login(emailUser, passwordUser);
        setTimeout(() => {
          validateLogin(emailUser);
        }, 3000);
      })
      .catch(error => {
        this.setState({
          nomeError: error.response.data.nome,
          emailError: error.response.data.email,
          passwordError: error.response.data.password,
          messageError: error.response.data.message,
        });
        this.setState(estadoInicial);
      })
  }

  getDisplay = (display, type) => {
    if (type === "nome") {
      this.setState({nomeError: ''})
    }
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

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    value === true ? this.setState({administrador: value}) : this.setState({administrador: value});
  }

  render() {
    const {msg_success} = this.state;
    return (
      <Container className="register-page">
        <Form className="form" onSubmit={this.submitHandler}>
          <Image className="imagem" src={logo1} width="200" height="200"/>
          <h2 className="font-robot">Cadastro</h2>
          {msg_success !== "Cadastro realizado com sucesso" ? null :
            <SuccessAlert name={msg_success} display={this.state.display}></SuccessAlert>}
          {this.state.nomeError ?
            <ErrorAlert name={this.state.nomeError} type={"nome"} closed={this.getDisplay}/> : null}
          {this.state.emailError ?
            <ErrorAlert name={this.state.emailError} type={"email"} closed={this.getDisplay}/> : null}
          {this.state.passwordError ?
            <ErrorAlert name={this.state.passwordError} type={"password"} closed={this.getDisplay}/> : null}
          {this.state.messageError ?
            <ErrorAlert name={this.state.messageError} type={"message"} closed={this.getDisplay}/> : null}
          <Form.Group className="mb-3 text-left" controlId="nome">
            <Form.Control data-testid="nome" name="nome" type="text" placeholder="Digite seu nome"
                          onChange={this.handleChange.bind(this)}/>
          </Form.Group>
          <Form.Group className="mb-3 text-left" controlId="email">
            <Form.Control data-testid="email" name="email" type="email" placeholder="Digite seu email" onChange={this.handleChange.bind(this)}/>
          </Form.Group>
          <Form.Group className="mb-3 text-left" controlId="password">
            <Form.Control data-testid="password" name="password" type="password" placeholder="Digite sua senha" onChange={this.handleChange.bind(this)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="administrador">
            <Form.Check type="checkbox" label="Cadastrar como administrador?" data-testid="checkbox" name="administrador" onChange={this.handleInputChange.bind(this)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cadastrarUsuario">
            <Button data-testid="cadastrar" type="submit" className="btn btn-primary">Cadastrar</Button>
          </Form.Group>
          <Form.Text className="message">Já é cadastrado?
            <LinkButton dataTestId="entrar" text="Entrar" route="/login"></LinkButton>
          </Form.Text>
        </Form>
      </Container>
    )
  }
}

export default RegisterUser;
