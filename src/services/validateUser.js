import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Utils from './utils';

export function validateLogin(emaill) {
  const navigate = useNavigate()

  axios
    .get(`${Utils.getBaseUrl()}/usuarios`)
    .then((response) => {
      const { usuarios } = response.data;
      usuarios.forEach((element) => {
        if (element.email === emaill) {
          if (element.administrador === 'true') {
            localStorage.setItem('serverest/userNome', element.nome);
            navigate('/admin/home');
          } else {
            navigate('/home');
          }
        }
      });
    });
}

export function ValidateToken() {
  const token = localStorage.getItem('serverest/userToken');
  if (token === null) { navigate('/login'); }
}

export function login(email, password) {
  axios
    .post(`${Utils.getBaseUrl()}/login`, {
      email,
      password,
    })
    .then((response) => {
      localStorage.setItem('serverest/userToken', response.data.authorization);
    })
    .catch((error) => {
      console.log(error.data);
    });
}
