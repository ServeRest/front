import React from 'react';
import { Link } from 'react-router-dom';
import CardList from '../../component/CardList';
import Navbar from '../../component/navbarClient';
import CartButton from '../../component/cartButton';
import '../../styles/homeClient.css';

class Home extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="jumbotron">
          <h1>Serverest Store 
            <Link to="/carrinho">
              <CartButton/>
            </Link>
          </h1>
          <CardList />
      </div>
      </>
    );
  }
}

export default Home;