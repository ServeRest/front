import React from 'react';
import Navbar from '../../component/navbarAdmin';
import 'bootswatch/dist/minty/bootstrap.min.css';
import { validateToken } from '../../services/validateUser';
import imagem from '../../imagens/trabalho.png'

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    validateToken();
  }

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

export default Reports;
