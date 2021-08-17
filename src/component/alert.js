import React,{ Component } from 'react';
import 'bootswatch/dist/minty/bootstrap.min.css';

export default class SuccessAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
  }
  
  handleClick = () => {
    this.setState({
      display: false
    })
  }
  
  render() {
    return (
      <div>
        { this.state.display && 
          <div className="alert alert-dismissible alert-primary">
              <button type="button" className="close close btn-close-succcess-alert" data-dismiss="alert" onClick={() => this.handleClick()}>&times;</button>
          <a href="/#" className="alert-link">{ this.props.name }</a>
          </div>
        }
      </div>
    )
  }
}
