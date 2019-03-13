import React, { Component } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { connect } from 'react-redux';


/**
 * 실제 채팅방 접속
 */
const mapStateToProps = (state) => {
  const { userId, chatroomId } = state;
  return {
    userId,
    chatroomId,
  };
};

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    
    // sockjs 객체
    const sockJS = new SockJS('/sockjs');
    const stomp = Stomp.over(sockJS);
    
    this.state = {
      stomp,
      isConnection: false,
    };
    
  }

  componentDidMount() {
    const { stomp } = this.state;
    
    stomp.connect('test', 'test', (frame) => {
      this.setState({
        isConnection: true,
        frame,
      });
    }, (error) => {
      console.log(error);
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      userId,
      chatroomId,
    } = nextProps;
    const {
      stomp,
      isConnection,
    } = this.state;

    if (userId !== '' && chatroomId !== '' && isConnection) {
      const broker = `/topic/connect/${chatroomId}`;
      const destination = `/app/connect/${chatroomId}`;
      const message = {
        id: userId,
      };
      stomp.subscribe(broker, (message) => {
        console.log(message);
      });

      stomp.send(destination, JSON.stringify(message));
    }
  }
  
  render() {
    return (
      <div />
    );
  }
}

export default connect(mapStateToProps)(ChatRoom);