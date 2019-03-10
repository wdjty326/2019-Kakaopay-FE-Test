import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Root extends Component {
  render() {
    return <div>메인페이지</div>;
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
