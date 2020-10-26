import axios from 'axios';
import history from './history';

export function validateLogin(emaill) {
  axios
    .get('https://serverest.dev/usuarios')
    .then((response) => {
      const { usuarios } = response.data;
      usuarios.forEach((element) => {
        if (element.email === emaill) {
          if (element.administrador === 'true') {
            localStorage.setItem('@nome-do-app/userNome', element.nome);
            history.push('/admin/home');
          } else {
            history.push('/home');
          }
        }
      });
    });
}

export function validateToken() {
  const token = localStorage.getItem('@nome-do-app/userToken');
  if (token === null) { history.push('/login'); }
}

export function login(email, password) {
  axios
    .post('https://serverest.dev/login', {
      email: email,
      password: password,
    })
    .then((response) => {
      localStorage.setItem('@nome-do-app/userToken', response.data.authorization);
    })
    .catch((error) => {
      console.log(error.data);
    });
}
