import axios from 'axios';
import Utils from './utils';


export async function getAllUsers() {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  };

  return await axios
  .get(`${Utils.getBaseUrl()}/usuarios`, config)
  .then((respose) => respose)
  .catch((error) => error)
}

export async function registerUser(state) {
    return await axios
    .post(`${Utils.getBaseUrl()}/usuarios`, {
      nome: state.name,
      email:state.email,
      password: state.password,
      administrador: state.administrador,
     })
     .then((respose) => respose)
     .catch((error) => error)
}

export async function deleteUser(id) {
  return await axios.delete(`${Utils.getBaseUrl()}/usuarios/${id}`)
  .then((respose) => respose)
  .catch((error) => error)
}