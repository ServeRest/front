import React from 'react';
import Navbar from '../../component/navbar';
import 'bootswatch/dist/minty/bootstrap.min.css';
import { validateToken } from '../../services/validateAccessPages';

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
        <p>relatorios</p>
      </>
    );
  }
}

export default Reports;
