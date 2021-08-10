import axios from 'axios';
import Utils from './utils';

export async function login(email, password) {
    return await axios
    .post(`${Utils.getBaseUrl()}/login`, {
    email: email,
    password: password,
    })
    .then((respose) => respose)
    .catch((error) => error)
}