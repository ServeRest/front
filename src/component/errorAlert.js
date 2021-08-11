import React, { Component } from 'react';
import 'bootswatch/dist/minty/bootstrap.min.css';
import '../styles/errorAlert.css'

export default class ErrorAlert extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      display: true,
    };
  }

  shouldComponentUpdate() {
    if (!this.state.display) {
      this.setState({
        display: true
      })
    }
    return true
  }

  handleClose() {
    if(this.state.display) {
      this.setState({
        display: false
      })
    }
  }

  render() {
      if (this.state.display) {
        return (
          <div className="alert alert-secondary alert-dismissible" role="alert" key={this.state.key}>
            <button type="button" className="close btn-close-error-alert" data-dismiss="alert" aria-label="Close" onClick={() => this.handleClose()}>
              <span aria-hidden="true">&times;</span>
            </button>
            <span>{ this.props.name }</span>
          </div>
        );
      }
      return <div/>
  }
}
