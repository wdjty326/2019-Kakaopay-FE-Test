import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Main from './component';
import store from './store';

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
