import history from './history';

export function validateToken() {
  const token = localStorage.getItem('@nome-do-app/userToken')
  if (token === null) { history.push('/login'); }
}
