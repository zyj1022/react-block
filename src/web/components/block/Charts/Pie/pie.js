import React, { Component } from 'react';

class Pie extends Component {

  componentDidMount() {}

  render() {
    const { title, data, padding } = this.props;

    return (
      <div style={{ paddingTop: '100px', backgroundColor:'#666' }}>
        <p>Pie111 = {title} </p>
      </div>
    );
  }
}

export default Pie;
