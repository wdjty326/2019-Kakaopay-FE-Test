import React, { Component, Fragment } from 'react';
import Logon from './logon';
import { ChatList, ChatRoom } from './chat';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Logon />
        <ChatList />
        <ChatRoom />
      </Fragment>
    );
  }
}
