import React, { Component } from 'react';

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '@tylermcginnis33'
    };
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  render() {
    return (
      <div>
        Hello {this.state.username} <br />
        Change Name: <input type="text" value={this.state.username} onChange={this.handleChange} />
      </div>
    )
  }
}

export default Greeting;
