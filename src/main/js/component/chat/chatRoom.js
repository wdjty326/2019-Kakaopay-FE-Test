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
      fileSource: null, // 파일 소스
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

  componentDidUpdate() {
    console.log(this.state);
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

  onChangeFileSource = (event) => {
    const { target } = event;

    this.getBase64(target.files[0]).then(
      (fileSource) => {
        console.log(fileSource);
        this.setState({
          fileSource,
        });
      }
    ).catch(error => {
      console.log(error);
    });
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // 이미지 사이즈를 줄이기 위해 캠버스로 다시 그림
        const img = document.createElement("img");
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          const MAX_WIDTH = 600;
          const MAX_HEIGHT = 480;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const dataurl = canvas.toDataURL("image/jpeg");
          resolve(dataurl);
        };
      };
      reader.onerror = error => reject(error);
    });
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

    const pushDestination = `/app/push/${chatroomId}`;
    stomp.send(pushDestination, {}, JSON.stringify({
      id: userId,
      fileSource,
      message,
    })); 
  }

  render() {
    const {
      message,
      cacheList,
      fileSource,
    } = this.state;

    return (
      <Fragment>
        <div>
          {
            cacheList.map((cache, i) => (
              <div key={i}>
                <span>{cache.id}</span>
                {
                  (cache.fileSource) ? (
                    <div>
                      <img src={cache.fileSource} />
                    </div>
                  ) : null
                }
                <p>{cache.message}</p>
              </div>
            ))
          }
        </div>
        {
          (fileSource) ? (
            <div>
              <span>이미지 미리보기</span>
              <img src={fileSource} />
            </div>
          ) : null
        }
        <form onSubmit={this.sendMessage}>
          <input type='file' accept='image/*' onChange={this.onChangeFileSource}  />
          <input type='text' value={message} onChange={this.onChangeMessage} />
          <button type='submit'>전송</button>
        </form>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(ChatRoom);