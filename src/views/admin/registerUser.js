import Navbar from '../../component/navbarAdmin'
import React from 'react';
import ErrorAlert from '../../component/errorAlert';
import {validateToken} from '../../services/validateUser';
import history from '../../services/history';
import {registerUser} from '../../services/users';
import {Button, Container, Form, Row} from "react-bootstrap";

const estadoInicial = {formData: {}}

class RegisterUsers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formData: {},
      administrador: false,
      nomeError: '',
      emailError: '',
      passwordError: '',
      messageError: ''
    }
  }

  componentDidMount() {
    validateToken();
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

  handleSubmit = e => {
    e.preventDefault();
    registerUser({
      nome: this.state.formData.nome,
      email: this.state.formData.email,
      password: this.state.formData.password,
      administrador: this.state.administrador.toString(),
    })
      .then((response) => {
        history.push('/admin/listarusuarios');
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

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    value === true ? this.setState({administrador: value}) : this.setState({administrador: value});
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Container className="jumbotron" fluid>
          <Form onSubmit={this.handleSubmit}>
            {this.state.nomeError ?
              <ErrorAlert name={this.state.nomeError} type={"nome"} closed={this.getDisplay}/> : null}
            {this.state.emailError ?
              <ErrorAlert name={this.state.emailError} type={"email"} closed={this.getDisplay}/> : null}
            {this.state.passwordError ?
              <ErrorAlert name={this.state.passwordError} type={"password"} closed={this.getDisplay}/> : null}
            {this.state.messageError ?
              <ErrorAlert name={this.state.messageError} type={"message"} closed={this.getDisplay}/> : null}
            <h1>Cadastro de usuários</h1>
            <hr className="my-4"></hr>
            <Row md={2} className="justify-content-center">
              <Form.Group className="mb-3 text-left" controlId="nome">
                <Form.Label>Nome: *</Form.Label>
                <Form.Control data-testid="nome" name="nome" type="text" placeholder="Digite seu nome" onChange={this.handleChange.bind(this)}/>
              </Form.Group>
            </Row>
            <Row md={2} className="justify-content-center">
              <Form.Group className="mb-3 text-left" controlId="email">
                <Form.Label>Email: *</Form.Label>
                <Form.Control data-testid="email" name="email" type="email" placeholder="Digite seu email" onChange={this.handleChange.bind(this)}/>
              </Form.Group>
            </Row>
            <Row md={2} className="justify-content-center">
              <Form.Group className="mb-3 text-left" controlId="password">
                <Form.Label>Senha: *</Form.Label>
                <Form.Control data-testid="password" name="password" type="password" placeholder="Digite sua senha" onChange={this.handleChange.bind(this)}/>
              </Form.Group>
            </Row>
            <Row md={2} className="justify-content-center">
              <Form.Group className="mb-3" controlId="administrador">
                <Form.Check type="checkbox" label="Cadastrar como administrador?" data-testid="checkbox" name="administrador" onChange={this.handleInputChange.bind(this)} />
              </Form.Group>
            </Row>
            <Row md={2} className="justify-content-center">
              <Form.Group className="mb-3" controlId="cadastrarUsuario">
                <Button data-testid="cadastrarUsuario" type="submit" className="btn btn-primary">Cadastrar</Button>
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </div>
    )
  }
}

export default RegisterUsers;
