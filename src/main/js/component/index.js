import React, { Component } from 'react';
import Logon from './logon';
import ChatMain from './chat';
import { Route, Switch } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

class App extends Component {
  render() {
    return (  
      <Route render={({location}) => (
        <div>
          <Switch location={location}>
            <Route exact path='/' component={Logon} />
            <Route path='/chat' component={ChatMain} />
          </Switch>
        </div>
       )} />
    );
  }
}

export default App;
