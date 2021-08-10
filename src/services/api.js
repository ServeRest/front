import Utils from './utils'

export async function getProductsFromCategoryAndQuery(query) {
  return fetch(`${Utils.getBaseUrl()}/produtos?nome=${query}`)
    .then((response) => response.json())
    .then((data) => data);
}
