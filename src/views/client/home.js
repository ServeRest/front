import React from 'react';
import Navbar from '../../component/navbarClient';
import 'bootswatch/dist/minty/bootstrap.min.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar />
        <p>home do cliente</p>
      </>
    );
  }
}

export default Home;
