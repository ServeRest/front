import axios from 'axios';
import Utils from './utils';

export async function getAllProducts() {
    const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('serverest/userToken'),
        },
    };

    return await axios
    .get(`${Utils.getBaseUrl()}/produtos`, config)
    .then((response) => response)
    .catch((error) => {
        console.error(error.message);
    })
}

export async function registerProduct(state) {
    const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('serverest/userToken'),
        }
      };

    return await axios
      .post(`${Utils.getBaseUrl()}/produtos`,
        {
          nome: state.name,
          preco: state.price,
          descricao: state.description,
          quantidade: state.quantity,
      }, config)
      .then((response) => response)
      .catch((error) => error)
}

export async function registerProductWithImage(state) {
    const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('serverest/userToken'),
        }
      };

    return await axios
    .post(`${Utils.getBaseUrl()}/produtos`,
      {
        nome: state.name,
        preco: state.price,
        descricao: state.description,
        quantidade: state.quantity,
        imagem: state.imagem
    }, config)
}

export async function deleteProductById(id) {
    const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: localStorage.getItem('serverest/userToken'),
    },
    }

    return await axios.delete(`${Utils.getBaseUrl()}/produtos/${id}`, config)
    .then((response) => response)
    .catch((error) => error)
}

export async function getProductsFromCategoryAndQuery(query) {
  return fetch(`${Utils.getBaseUrl()}/produtos?nome=${query}`)
    .then((response) => response.json())
    .then((data) => data);
}