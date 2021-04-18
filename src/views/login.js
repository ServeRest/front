// import React from 'react';
// import axios from 'axios';
// import 'bootswatch/dist/minty/bootstrap.min.css';
// import ErrorAlert from '../component/errorAlert';
// import { validateLogin } from '../services/validateUser';
// import LinkButton from '../component/linkButton';
// import logo1 from '../imagens/serverestlogo1.png'
// import '../styles/login.css';

// const estadoInicial = { email: '', password: '' }

// class Login extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       email: '',
//       password: '',
//       errors: '',
//       msg_error: [],
//     }
//   }

//   changeHandler = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   submitHandler = e => {
//     e.preventDefault();
//     axios
//       .post('https://serverest.dev/login', {
//         email: this.state.email,
//         password: this.state.password,
//        })
//       .then((response) => {
//         localStorage.setItem('serverest/userEmail', this.state.email);
//         localStorage.setItem('serverest/userToken', response.data.authorization);
//         const emailStorage = localStorage.getItem('serverest/userEmail');
//         validateLogin(emailStorage);
//       })
//       .catch(error => {
//         this.setState({errors: error.response.data });
//         const allErrors = Object.values(this.state.errors);
//         this.setState({msg_error: allErrors});
//         this.setState(estadoInicial);
//       });
//   }

//   render() {
//     const { email, password } = this.state;
//     return (
//       <div className="login-page">
//         { this.state.msg_error.map((item, index) => {
//           return <ErrorAlert name={ item } key={ index } display={ this.state.display }></ErrorAlert>;
//         })}
//         <form onSubmit={ this.submitHandler }>
//           <div className="form">
//           <img className="imagem" src={ logo1 } width="200" height="200" />
//           <h2 className="font-robot">Login</h2>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Digite seu email"         
//               name="email" value={ email }
//               onChange={this.changeHandler}></input>
//             <br></br>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Digite sua senha"
//               name="password" value={ password }
//               onChange={this.changeHandler}></input>
//             <br></br>
//             <button type="submit" className="btn btn-primary">Entrar</button>
//             <p 
//               className="message">Não é cadastrado?
//               <LinkButton dataTestId="cadastrar" text="Cadastre-se" route="/cadastrarusuarios"></LinkButton>
//             </p>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }

// export default Login;

import React from 'react';
import axios from 'axios';
import 'bootswatch/dist/minty/bootstrap.min.css';
import ErrorAlert from '../component/errorAlert';
import { validateLogin } from '../services/validateUser';
import LinkButton from '../component/linkButton';
import logo1 from '../imagens/serverestlogo1.png'
import '../styles/login.css';

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
      .post('https://serverest.dev/login', {
        email: this.state.email,
        password: this.state.password,
       })
      .then((response) => {
        localStorage.setItem('serverest/userEmail', this.state.email);
        localStorage.setItem('serverest/userToken', response.data.authorization);
        const emailStorage = localStorage.getItem('serverest/userEmail');
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
        <form onSubmit={ this.submitHandler }>
          <div className="form">
          <img className="imagem" src={ logo1 } width="200" height="200" />
          <h2 className="font-robot">Login</h2>
          <br />
            { this.state.msg_error.map((item, index) => {
              return <ErrorAlert name={ item } key={ index } display={ this.state.display }></ErrorAlert>;
            })}
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu email"         
              name="email" value={ email }
              data-testid="email"
              onChange={this.changeHandler}></input>
            <br></br>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              data-testid="senha"
              name="password" value={ password }
              onChange={this.changeHandler}></input>
            <br />
            <button data-testid="entrar" type="submit" className="btn btn-primary">Entrar</button>
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

