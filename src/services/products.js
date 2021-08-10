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

export async function registerProduct(name, price, description, quantity) {
    const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('serverest/userToken'),
        }
      };

    return await axios
      .post(`${Utils.getBaseUrl()}/produtos`,
        {
          nome: name,
          preco: price,
          descricao: description,
          quantidade: quantity,
      }, config)
      .then((response) => response)
      .catch((error) => error)
}

export async function registerProductWithImage(name, price, description, quantity, image) {
    const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('serverest/userToken'),
        }
      };

    return await axios
    .post(`${Utils.getBaseUrl()}/produtos`,
      {
        nome: this.state.name,
        preco: this.state.price,
        descricao: this.state.description,
        quantidade: this.state.quantity,
        imagem: this.state.imagem
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