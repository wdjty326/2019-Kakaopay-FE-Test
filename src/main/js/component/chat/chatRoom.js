import React, { Component, Fragment, createRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadImageFile } from '../../store/action';


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
      fileSource: null, // 파일 소스
    }; 

    this.cacheListRef = createRef();
    this.fileSourceRef = createRef();
  }

  componentDidMount() {
    const { stomp } = this.state;
    const {
      userId,
      chatroomId,
    } = this.props;
    
    // 에러처리
    if (userId && chatroomId) {
      stomp.connect({}, () => {
        const connectBroker = `/topic/connect/${chatroomId}`;
        const pushBroker = `/topic/push/${chatroomId}`;
        
        stomp.subscribe(connectBroker, (message) => {
          const { body } = message;
          const jsonData = JSON.parse(body);
          const { id } = jsonData;
          const cache = {
            ...jsonData,
            ...{
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
    } else {
      this.updateCache({
        type: 'connect',
        message: '서버와의 연결이 끊어졌습니다. 로그아웃 후 다시 접속해주세요.',
      });
    }
  }

  componentDidUpdate() {
    // 스크롤 하단이동
    const cacheListElement = this.cacheListRef.current;
    cacheListElement.scrollTop = cacheListElement.scrollHeight;
  }

  updateCache = (cache) => {
    const { cacheList } = this.state;
    const updateCacheList = cacheList.map((i) => i);

    updateCacheList.push(cache);
    this.setState({
      cacheList: updateCacheList,
      message: '',
      fileSource: null,
    });

    const fileSourceRef = this.fileSourceRef.current;
    fileSourceRef.value = null;
  }

  onChangeMessage = (event) => {
    const { target } = event;
    this.setState({
      message: target.value,
    });
  }

  onChangeFileSource = (event) => {
    const { target } = event;
    this.setState({
      fileSource: target.files[0],
    });
  }
  
  componentWillUnmount() {
    const { stomp } = this.state;
    stomp.disconnect();
  }
  /**
   * 
   */
  sendMessage = (event) => {
    event.preventDefault();
    const {
      userId,
      chatroomId,
    } = this.props;
    const {
      stomp,
      message,
      fileSource,
    } = this.state;
    const send = (fileSource = null) => {
      const pushDestination = `/app/push/${chatroomId}`;
      stomp.send(pushDestination, {}, JSON.stringify({
        id: userId,
        message,
        fileSource,
      }));
    };

    // 에러처리
    if ((userId && chatroomId) && (fileSource || message !== '')) {
      if (fileSource) {
        uploadImageFile(fileSource, (response) => {
          const { fileDownloadUri } = response;

          if (fileDownloadUri) {
            send(fileDownloadUri);
          }
        });
      } else {
        send();
      }
    }
  }

  render() {
    const {
      userId,
    } = this.props;
    const {
      message,
      cacheList,
      fileSource,
    } = this.state;

    return (
      <Fragment>
        <div
          className='cacheList'
          ref={this.cacheListRef}
        >
          {
            cacheList.map((cache, i) => {
              return (cache.type === 'connect') ? (
                <div key={i} className='connect'>
                  <p>{cache.message}</p>
                </div>
              ) : (
                <div
                  key={i}
                  className={(cache.id === userId) ? 'chatbox me' : 'chatbox then'}
                >
                  <span>{cache.id}</span>
                  <div
                    className='arrow_box'
                  >
                    {
                      (cache.fileSource) ? (
                        <img src={cache.fileSource} />
                      ) : null
                    }
                    {cache.message}
                  </div>
                </div>
              )
            })
          }
        </div>
        <form onSubmit={this.sendMessage}>
          {
            (fileSource) ? (
              <div className='preview-image'>
                <img src={URL.createObjectURL(fileSource)} />
              </div>
            ) : null
          }
          <input type='file' ref={this.fileSourceRef} accept='image/*' className='form-control-file' onChange={this.onChangeFileSource} />
          <div className='input-group'>
            <input type='text' className='form-control' value={message} onChange={this.onChangeMessage} />
            <div className='input-group-append'>
              <button type='submit' className='btn btn-secondary'>전송</button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

ChatRoom.propTypes = {
  userId: PropTypes.string,
  chatroomId: PropTypes.string,
};

ChatRoom.defaultProps = {
  userId: 'test',
  chatroomId: 'test',
};

export default connect(mapStateToProps)(ChatRoom);