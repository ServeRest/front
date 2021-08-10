import React from 'react';
import Card from './Card';
import Cart from '../services/cart';
import NoSearching from './NoSearching';
import Loading from './Loading';
import { BsSearch } from "react-icons/bs";
import { validateToken } from '../services/validateUser';
import { getAllProducts, getProductsFromCategoryAndQuery } from '../services/products';

class CardList extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      value: '',
      products: [],
      categoryId: '',
      empty: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchCard = this.fetchCard.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    validateToken();

    getAllProducts()
    .then((response) => {
      const produtos = response.data;
      this.setState({ products: produtos.produtos });
    });
    
    Cart.createStorage();
  }

  handleClick() {
    const { value } = this.state;
    if (value !== '' || value != null) {
      this.setState({
        loading: true,
      });
      this.fetchCard('');
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async fetchCard(id) {
    const { value } = this.state;
    const card = await getProductsFromCategoryAndQuery(value);
    const noResults = 0;
    this.setState({
      loading: false,
      products: card.produtos,
      empty: (card.produtos.length === noResults),
    });
  }

  render() {
    const { products, value, empty, loading } = this.state;
    return (
      <>
        <div className="col-12">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <input
                className="form-control my-5 mx-3 my-sm-0"
                data-testid="pesquisar"
                type="search"
                placeholder="Pesquisar Produtos"
                aria-label="Search"
                value={ value }
                onChange={ this.handleChange }
              />
            </div>
            <div className="col-2">
              <button
                className="btn btn-primary my-2 my-sm-0"
                type="button"
                data-testid="botaoPesquisar"
                onClick={ this.handleClick }
              >
                Pesquisar  <BsSearch />
              </button>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <h4>Produtos</h4>
        <br />
        <div className="container-fluid">
          <div className="">
            <div className="col-12"></div>
            <section className="row espacamento">
              { loading ? <Loading /> : products.map((product) => (
                <Card product={ product } key={ product._id } />)) }
              { (empty != null && empty) ? <NoSearching /> : false }
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default CardList;
