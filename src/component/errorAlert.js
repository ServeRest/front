import React, { Component } from 'react';
import 'bootswatch/dist/minty/bootstrap.min.css';

export default class ErrorAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
    };
  }

  render() {
    return (
      <div>
        { this.state.display
          && <div className="alert alert-dismissible alert-secondary">
            <a href="/#" className="alert-link">{ this.props.nome }</a>
             </div>}
      </div>
    );
  }
}
