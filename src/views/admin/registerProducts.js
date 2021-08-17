import Navbar from '../../component/navbarAdmin';
import React from 'react';
import ErrorAlert from '../../component/errorAlert';
import {validateToken} from '../../services/validateUser';
import history from '../../services/history';
import {registerProduct, registerProductWithImage} from '../../services/products';
import {Button, Container, Form, Row} from "react-bootstrap";

const estadoInicial = {formData: {}}

class RegisterProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      nomeError: '',
      priceError: '',
      descriptionError: '',
      quantityError: '',
      messageError: '',
    }
  }

  componentDidMount() {
    validateToken();
  }

  getDisplay = (display, type) => {
    if (type === "nome") {
      this.setState({nomeError: ''})
    }
    if (type === "price") {
      this.setState({priceError: ''})
    }
    if (type === "description") {
      this.setState({descriptionError: ''})
    }
    if (type === "quantity") {
      this.setState({quantityError: ''})
    }
    if (type === "message") {
      this.setState({messageError: ''})
    }
  }

  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    let {formData} = this.state;
    formData[name] = value;
    this.setState({
      formData: formData,
    });
    console.log(formData)
  }

  submitHandler = e => {
    e.preventDefault();
    if (this.state.imagem == '' || null || undefined) {
      registerProduct({
        nome: this.state.formData.nome,
        preco: this.state.formData.price,
        descricao: this.state.formData.description,
        quantidade: this.state.formData.quantity,
      }).then((response) => {
        history.push('/admin/listarprodutos');
      }).catch(error => {
        this.setState({
          nomeError: error.response.data.nome,
          priceError: error.response.data.preco,
          descriptionError: error.response.data.descricao,
          quantityError: error.response.data.quantidade,
          messageError: error.response.data.message,
        });
        this.setState(estadoInicial);
      })
    } else {
      registerProductWithImage({
        nome: this.state.formData.nome,
        preco: this.state.formData.price,
        descricao: this.state.formData.description,
        quantidade: this.state.formData.quantity,
        imagem: this.state.formData.imagem,
      }).then((response) => {
        history.push('/admin/listarprodutos');
      }).catch(error => {
        this.setState({
          nomeError: error.response.data.nome,
          priceError: error.response.data.preco,
          descriptionError: error.response.data.descricao,
          quantityError: error.response.data.quantidade,
          messageError: error.response.data.message,
        });
        this.setState(estadoInicial);
      })
    }
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Container className="jumbotron" fluid>
          <Form onSubmit={this.submitHandler}>
            {this.state.nomeError ?
              <ErrorAlert name={this.state.nomeError} type={"nome"} closed={this.getDisplay}/> : null}
            {this.state.priceError ?
              <ErrorAlert name={this.state.priceError} type={"price"} closed={this.getDisplay}/> : null}
            {this.state.descriptionError ?
              <ErrorAlert name={this.state.descriptionError} type={"description"} closed={this.getDisplay}/> : null}
            {this.state.quantityError ?
              <ErrorAlert name={this.state.quantityError} type={"quantity"} closed={this.getDisplay}/> : null}
            {this.state.messageError ?
              <ErrorAlert name={this.state.messageError} type={"message"} closed={this.getDisplay}/> : null}
            <h1>Cadastro de Produtos</h1>
            <hr className="my-4"/>
            <Row md={2} className="justify-content-center">
              <Form.Group className="mb-3 text-left" controlId="nome">
                <Form.Label>Nome: * </Form.Label>
                <Form.Control data-testid="nome" name="nome" type="text" placeholder="Digite o nome do produto" onChange={this.handleChange.bind(this)}/>
              </Form.Group>
            </Row>
            <Row md={2} className="justify-content-center">
              <Form.Group className="mb-3 text-left" controlId="price">
                <Form.Label>Preço: * </Form.Label>
                <Form.Control data-testid="preco" name="price" type="number" placeholder="Digite o valor do produto" onChange={this.handleChange.bind(this)}/>
              </Form.Group>
            </Row>
            <Row md={2} className="justify-content-center">
              <Form.Group className="mb-3 text-left" controlId="description">
                <Form.Label>Descrição: * </Form.Label>
                <Form.Control data-testid="descricao" name="description" as="textarea" rows={3}
                              placeholder="Digite a descrição do produto" onChange={this.handleChange.bind(this)}/>
              </Form.Group>
            </Row>
            <Row md={2} className="justify-content-center">
              <Form.Group className="mb-3 text-left" controlId="quantity">
                <Form.Label>Quantidade: * </Form.Label>
                <Form.Control data-testid="quantity" name="quantity" type="number"
                              placeholder="Digite aquantidade do produto" onChange={this.handleChange.bind(this)}/>
              </Form.Group>
            </Row>
            <Row md={2} className="justify-content-center">
              <Form.Group className="mb-3 text-left" controlId="imagem">
                <Form.Label>Imagem: * </Form.Label>
                <Form.Control data-testid="imagem" name="imagem" type="file" onChange={this.handleChange.bind(this)}/>
              </Form.Group>
            </Row>
            <Row md={2} className="justify-content-center">
              <Form.Group className="mb-3" controlId="cadastrarProdutos">
                <Button data-testid="cadastarProdutos" type="submit" className="btn btn-primary">Cadastrar</Button>
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </div>
    )
  }
}

export default RegisterProducts;
