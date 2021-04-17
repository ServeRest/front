export async function getProductsFromCategoryAndQuery(query) {
  return fetch(`https://serverest.dev/produtos?nome=${query}`)
    .then((response) => response.json())
    .then((data) => data);
}
