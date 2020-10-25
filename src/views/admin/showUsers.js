import React from 'react';
import Navbar from '../../component/navbar';
import 'bootswatch/dist/minty/bootstrap.min.css';

class ShowUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar />
        <p>lista dos usuarios</p>
      </>
    );
  }
}

export default ShowUsers;
