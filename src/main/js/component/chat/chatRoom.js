import React, { Component, Fragment } from 'react';
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
      stomp,  // stomp 브로커
      cacheList: [],  // 캐쉬
      message: '',  // 메세지
    }; 
  }

  componentDidMount() {
    const { stomp } = this.state;
    const {
      userId,
      chatroomId,
    } = this.props;
    
    stomp.connect({}, () => {
      const connectBroker = `/topic/connect/${chatroomId}`;
      const pushBroker = `/topic/push/${chatroomId}`;
      
      stomp.subscribe(connectBroker, (message) => {
        const { body } = message;
        const jsonData = JSON.parse(body);
        const { id } = jsonData;
        const cache = {
          jsonData,
          ...{
            type: 'text',
            message: `${id} 님께서 입장하셨습니다.`,
          }
        };
        
        this.updateCache(cache);
      });

      stomp.subscribe(pushBroker, (message) => {
        const { body } = message;
        const cache = JSON.parse(body);
        this.updateCache(cache);
      });

      const connectDestination = `/app/connect/${chatroomId}`;
      const message = {
        id: userId,
      };
      stomp.send(connectDestination, {}, JSON.stringify(message));
    }, (error) => {
      console.log(error);
    });
  }

  updateCache = (cache) => {
    const { cacheList } = this.state;
    const updateCacheList = cacheList.map((i) => i);

    updateCacheList.push(cache);
    this.setState({
      cacheList: updateCacheList,
    });
  }

  onChangeMessage = (event) => {
    const { target } = event;
    this.setState({
      message: target.value,
    });
  }

  onSubmitMessage = (event) => {
    event.preventDefault();
    const {
      message,
    } = this.state;

    this.sendMessage('text', message);
  };

  /**
   * 
   */
  sendMessage = (type, message) => {
    const {
      userId,
      chatroomId,
    } = this.props;
    const { stomp } = this.state;

    const pushDestination = `/app/push/${chatroomId}`;
    stomp.send(pushDestination, {}, JSON.stringify({
      id: userId,
      type,
      message,
    })); 
  }

  render() {
    const { message, cacheList } = this.state;

    return (
      <Fragment>
        <div>
          {
            cacheList.map((cache, i) => (
              <div key={i}>
                <span>{cache.id}</span>
                <span>{cache.message}</span>
              </div>
            ))
          }
        </div>
        <form onSubmit={this.onSubmitMessage}>
          <input type="text" value={message} onChange={this.onChangeMessage} />
          <button type="submit">전송</button>
        </form>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(ChatRoom);