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

export async function registerProduct({nome, preco, descricao, quantidade}) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': localStorage.getItem('serverest/userToken'),
    }
  };

    return await axios
      .post(`${Utils.getBaseUrl()}/produtos`,
        {
          nome,
          preco,
          descricao,
          quantidade,
      }, config)
}

export async function registerProductWithImage({nome, preco, descricao, quantidade, imagem}) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': localStorage.getItem('serverest/userToken'),
    },
  };

  return await axios
    .post(`${Utils.getBaseUrl()}/produtos`,
      {
        nome,
        preco,
        descricao,
        quantidade,
        imagem,
      }, config);
}

export async function deleteProductById(id) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: localStorage.getItem('serverest/userToken'),
    },
  };

    return await axios.delete(`${Utils.getBaseUrl()}/produtos/${id}`, config)
    .then((response) => response)
    .catch((error) => error)
}

export async function getProductsFromCategoryAndQuery(query) {
  return fetch(`${Utils.getBaseUrl()}/produtos?nome=${query}`)
    .then((response) => response.json())
    .then((data) => data);
}