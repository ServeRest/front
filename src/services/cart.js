function saveLocalStorage(productArray) {
  localStorage.setItem('products', JSON.stringify(productArray));
}

function loadLocalStorage() {
  return JSON.parse(localStorage.getItem('products') || '[]');
}

export default {
  createStorage: () => {
    const arrayProducts = loadLocalStorage();
    if (arrayProducts.length < 1) saveLocalStorage([]);
  },

  getItemsFromLocalStorage: () => loadLocalStorage(),

  addItem: (product) => {
    const products = loadLocalStorage();
    const item = {
      _id: product._id,
      nome: product.nome,
      preco: product.preco,
      imagem: product.imagem,
      quantidade: product.quantidade,
      descricao: product.descricao,
      amount: 1,
    };
    let uniqueProduct = false;
    products.forEach((element) => {
      if (item._id === element._id) {
        element.amount += 1;
        uniqueProduct = true;
      }
    });

    if (!uniqueProduct) products.push(item);
    saveLocalStorage(products);
  },

  removeItem: (id, quantity = 1) => {
    const arrayProducts = loadLocalStorage();
    arrayProducts
      .forEach((element) => {
        if (element._id === id && element.amount >= 1) {
          element.amount -= quantity;
        }
      });
    saveLocalStorage(arrayProducts);
  },

  deleteItem: (id) => {
    const arrayProducts = loadLocalStorage();
    const newArrayProducts = arrayProducts.filter(({ id: itemId }) => (itemId !== id));
    saveLocalStorage(newArrayProducts);
  },

  removeAll: () => {
    saveLocalStorage([]);
  },
};
