import Navbar from '../../component/navbarAdmin';
import React from 'react';
import axios from 'axios';
import 'bootswatch/dist/minty/bootstrap.min.css';
import ErrorAlert from '../../component/errorAlert';
import { validateToken } from '../../services/validateUser';
import history from '../../services/history';

const estadoInicial = { name: '', price: '', description: '', quantity: '', imagem: '' }

class RegisterProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      description: '',
      quantity: '',
      imagem: '',
      errors: '',
      msg_error: [],
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
    const config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('serverest/userToken'),
      }
    };

     if (this.state.imagem == '' || null || undefined) {
      axios
      .post('https://serverest.dev/produtos',
        {
          nome: this.state.name,
          preco: this.state.price,
          descricao: this.state.description,
          quantidade: this.state.quantity,
      }, config)
        .then((response) => {
          history.push('/admin/listarprodutos');
        })
        .catch(error => {
          this.setState({errors: error.response.data });
          const allErrors = Object.values(this.state.errors);
          this.setState({msg_error: allErrors});
        })
     } else {
      axios
      .post('https://serverest.dev/produtos',
        {
          nome: this.state.name,
          preco: this.state.price,
          descricao: this.state.description,
          quantidade: this.state.quantity,
          imagem: this.state.imagem
      }, config)
        .then((response) => {
          history.push('/admin/listarprodutos');
        })
        .catch(error => {
          this.setState({errors: error.response.data });
          const allErrors = Object.values(this.state.errors);
          this.setState({msg_error: allErrors});
        })
     }
    this.setState(estadoInicial);
  }

  render() {
    const { name, price, description, quantity, imagem } = this.state;
    return (
      <div>
        <Navbar></Navbar>
        <form className="jumbotron" onSubmit={ this.submitHandler }>
          { this.state.msg_error.map((item , index)=> {
            return <ErrorAlert name={ item } key={ index }></ErrorAlert>;
          })}
          <h1>Cadastro de Produtos</h1>
          <hr className="my-4"></hr>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="form-group">
                <p class="text-left">Nome: *</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite o nome"
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
                <p class="text-left">Preco: *</p>
                <input
                  className="form-control"
                  placeholder="Digite o preço"
                  name="price" value={ price }
                  data-testid="preco"
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
                <p
                  for="exampleFormControlTextarea1"
                  class="text-left">
                    Descrição: *
                </p>
                <textarea
                  className="form-control"
                  placeholder="Digite a descrição"
                  name="description" value={ description }
                  onChange={ this.changeHandler }
                  data-testid="descricao"
                  id="exampleFormControlTextarea1"
                  rows="3">
                </textarea>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="form-group">
                <p class="text-left">Quantidade: *</p>
                <input
                  type="number"
                  className="form-control"
                  name="quantity" value={ quantity }
                  data-testid="quantidade"
                  onChange={ this.changeHandler }>
                </input>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
            <p class="text-left">Imagem:</p>
              <input
                type="file"
                class="form-control-file"
                name="imagem" value={ imagem }
                onChange={ this.changeHandler } 
                data-testid="imagem"
                id="exampleFormControlFile1">
              </input>
            </div>
            <div className="col-md-4"></div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="form-group">
              <button data-testid="cadastarProdutos" type="submit" className="btn btn-primary">Cadastrar</button>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </form>
      </div>
      )
    }
  }

export default RegisterProducts;
