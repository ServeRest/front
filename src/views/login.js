import React from 'react';
import axios from 'axios';
import history from '../services/history';
import 'bootswatch/dist/minty/bootstrap.min.css';
import SuccessAlert from '../component/alert'
import ErrorAlert from '../component/errorAlert'
import '../styles/App.css';

const redirectPage = (route) => history.push(route);
const estadoInicial = { email: '', password: '' }
const linkButton = (text, dataTestId, route) => {
    return (
      <a data-testid={dataTestId} type='button' className="btn btn-link" onClick={() => redirectPage(route)}>
        {text}
      </a>
    )
};

class Login extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      email: '',
      password: '',
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
    .post('http://localhost:3000/login', {
      email: this.state.email,
      password: this.state.password,
     } )
    .then( response => { 
      this.setState({alert_message: "success"}) 
      this.setState({success: response.data.message })
    })
    .catch(error => {
        console.log(error.response.data );
      this.setState({errors: error.response.data })
      switch (this.state.errors !==null) {
        case (this.state.errors.email !== null) && (this.state.errors.password == null):
            console.log('erro no email')
            this.setState({alert_message: "error"});
            const errorEmail = Object.values(this.state.errors);
            this.setState({msg_error: errorEmail})
          break;
        case (this.state.errors.email == null) && (this.state.errors.password !== null) :
          this.setState({alert_message: "error"});
          const errorPassword = Object.values(this.state.errors);
          this.setState({msg_error: errorPassword})
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

  render() {
    const { email, password, alert_message, success} = this.state;
    return (
      <div className="login-page">
        {alert_message==="success"?<SuccessAlert nome={ success } > </SuccessAlert>:null}
        {this.state.msg_error.map((item , index)=> {
          return <ErrorAlert nome={ item } key={index} display={this.state.display}></ErrorAlert>;
        })}
        <form onSubmit={ this.submitHandler } >
          <div className="form" >
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
            <p className="message">Não é cadastrado?{ linkButton('Cadastre-se', 'cadastrar', '/cadastrousuarios') }</p>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;
