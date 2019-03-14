import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ChatRoom from './chatRoom';
import ChatList from './chatList';
import * as action from '../../store/action';


const mapStateToProps = (state) => {
  const { chatroomId } = state;
  return {
    chatroomId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUserID: (userId = null) => dispatch(action.setUserID(userId)),
  setChatroomID: (chatroomId = null) => dispatch(action.setChatroomID(chatroomId)),
});

class ChatMain extends Component {
  

  render() {
    const { chatroomId, setUserID, setChatroomID } = this.props;

    return (
      <div className='chat'>
        <nav className='navbar navbar-light bg-light'>
          <ul className='navbar-nav ml-auto'>
            {
              (chatroomId) ? (
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    href='#root'
                    onClick={() => setChatroomID()}
                  >
                    채팅방나가기 
                  </a>
                </li>
              ) : null
            }
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#root'
                onClick={() => setUserID()}
              >
                로그아웃 
              </a>
            </li>
          </ul>
        </nav>
        <div className='body'>
          {
            (chatroomId) ? <ChatRoom /> : <ChatList />
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMain);