import React from 'react';
import { Link } from 'react-router-dom';
import CardList from '../../component/CardList';
import Navbar from '../../component/navbarClient';
import CartButton from '../../component/cartButton';
import imagem from '../../imagens/trabalho.png'
import '../../styles/homeClient.css';

class Home extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="jumbotron">
          <h1>Em construção aguarde
          </h1>
          <img 
                              className="imagem" 
                              src={ imagem } 
                              
                            />
      </div>
      </>
    );
  }
}

export default Home;