import Navbar from '../../component/navbar'
import React from 'react';
import axios from 'axios';
import history from '../../services/history';
import 'bootswatch/dist/minty/bootstrap.min.css';
import SuccessAlert from '../../component/alert'
import ErrorAlert from '../../component/errorAlert'

const redirectPage = (route) => history.push(route);
const estadoInicial = { nome: '', email: '', password: '', administrador: 'false'}
const linkButton = (text, dataTestId, route) => {
    return (
      <a data-testid={dataTestId} type='button' href="/#" className="btn btn-link" onClick={() => redirectPage(route)}>
        {text}
      </a>
    )
};

class RegisterUsers extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      email: '',
      password: '',
      administrador: 'false',
      alert_message: '',
      errors: '',
      msg_error: []
    }
  }
    
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
    
  submitHandler = e => {
    e.preventDefault();
    axios
      .post('https://api.serverest.dev/usuarios', {
        nome: this.state.name,
        email:this.state.email,
        password: this.state.password,
        administrador: this.state.administrador,
       } )
      .then( response => { 
        this.setState({alert_message: "success"}) 
        this.setState({success: response.data.message })
      })
      .catch(error => {
        this.setState({errors: error.response.data })

        switch (this.state.errors !==null) {
          case (this.state.errors.nome != null) && (this.state.errors.email == null) && (this.state.errors.password == null):
            this.setState({alert_message: "error"});
            const errorName = Object.values(this.state.errors);
            this.setState({msg_error: errorName})
            break;
          case (this.state.errors.nome == null) && (this.state.errors.email !== null) && (this.state.errors.password == null):
            if (this.state.errors.message === 'Este email já está sendo usado'){
              this.setState({alert_message: "error"});
              const errorEmailUsed = Object.values(this.state.errors);
              this.setState({msg_error: errorEmailUsed})
            } else {
              this.setState({alert_message: "error"});
              const errorEmail = Object.values(this.state.errors);
              this.setState({msg_error: errorEmail})
            }
            break;
          case (this.state.errors.nome == null) && (this.state.errors.email == null) && (this.state.errors.password !== null) :
            this.setState({alert_message: "error"});
            const errorPassword = Object.values(this.state.errors);
            this.setState({msg_error: errorPassword})
            break;
          case (this.state.errors.nome !== null) && (this.state.errors.email !== null) && (this.state.errors.password == null):
            this.setState({alert_message: "error"});
            const errorNameEmail = Object.values(this.state.errors);
            this.setState({msg_error: errorNameEmail})
            break; 
          case (this.state.errors.nome !== null) && (this.state.errors.email == null) && (this.state.errors.password !== null):
            this.setState({alert_message: "error"});
            const errorNamePassword = Object.values(this.state.errors);
            this.setState({msg_error: errorNamePassword})
            break;
            case (this.state.errors.nome == null) && (this.state.errors.email !== null) && (this.state.errors.password !== null):
              this.setState({alert_message: "error"});
              const errorEmailPassword = Object.values(this.state.errors);
              this.setState({msg_error: errorEmailPassword})
            break;
          default:
            this.setState({alert_message: "error"}) 
            const allErrors = Object.values(this.state.errors);
            this.setState({msg_error: allErrors})
            break;
        }
      })
    this.setState(estadoInicial)
  }
    
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked.toString() : target.value.toString();
    value === true ? this.setState({ administrador: value }) : this.setState({ administrador: value });
  }
    
  render() {
    const { name, email, password, administrador, alert_message, success} = this.state;
    return (
      <div>
        <Navbar></Navbar>
          {alert_message==="success"?<SuccessAlert name={ success } > </SuccessAlert>:null}
          {this.state.msg_error.map((item , index)=> {
            return <ErrorAlert name={ item } key={index} display={this.state.display}></ErrorAlert>;
          })}
        <form className="jumbotron" onSubmit={ this.submitHandler }>
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
                  name="name" value={ name } 
                  onChange={this.changeHandler}>
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
                  name="email" value={ email } 
                  onChange={this.changeHandler}>
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
                  name="password" value={ password } 
                  onChange={this.changeHandler}>
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
                      onChange={this.handleInputChange}>
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
              <button type="submit" className="btn btn-primary">Cadastrar</button>
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
