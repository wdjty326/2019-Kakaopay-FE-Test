import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faReact, faEmber, faAngular, faVuejs, faNodeJs} from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter as Router } from "react-router-dom";


import Main from './component';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './resource/css/index.css';

library.add(faComment);
library.add(faReact);
library.add(faEmber);
library.add(faAngular);
library.add(faVuejs);
library.add(faNodeJs);


class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
