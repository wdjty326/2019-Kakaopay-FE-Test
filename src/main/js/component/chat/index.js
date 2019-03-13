import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ChatRoom from './chatRoom';
import ChatList from './chatList';


const mapStateToProps = (state) => {
  const { chatroomId } = state;
  return {
    chatroomId,
  };
}

class ChatMain extends Component {
  render() {
    const { chatroomId } = this.props;

    return (
      <Fragment>
        {
          (chatroomId) ? <ChatRoom /> : <ChatList />
        }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(ChatMain);