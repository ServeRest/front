import React from 'react';
import Navbar from '../../component/navbar';
import 'bootswatch/dist/minty/bootstrap.min.css';

class RegisterProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar />
        <p>cadatro de produtos</p>
      </>
    );
  }
}

export default RegisterProducts;
