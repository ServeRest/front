import axios from 'axios';
import history from '../services/history';

export function validateLogin(emaill){
  axios
    .get('https://api.serverest.dev/usuarios')
    .then( response => {
      const usuarios = response.data.usuarios
      usuarios.forEach(element => {
        if( element.email === emaill) {
          if(element.administrador === 'true') {
            localStorage.setItem('@nome-do-app/userNome', element.nome);
            history.push('/admin/home');
          } else {
            history.push('/home');
          }
        }
     }); 
    })
}
