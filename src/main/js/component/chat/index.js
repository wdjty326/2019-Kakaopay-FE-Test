import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ChatRoom from './chatRoom';
import ChatList from './chatList';
import PropTypes from 'prop-types';
import * as action from '../../store/action';
import { Route, Switch } from 'react-router-dom';

const mapStateToProps = (state) => {
  const { userId, chatroomId, chatroomList } = state;
  return {
    userId,
    chatroomId,
    chatroomList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUserID: (userId = null) => dispatch(action.setUserID(userId)),
  setChatroomID: (chatroomId = null) => dispatch(action.setChatroomID(chatroomId)),
});

class ChatMain extends Component {
  logoutChatroom = () => {
    const { history, setChatroomID, userId } = this.props;

    setChatroomID();
    history.replace(`/chat/${userId}`);
  }

  logoutUser = () => {
    const { history, setUserID, setChatroomID } = this.props;

    setUserID();
    setChatroomID();
    history.replace('/');
  }
  

  render() {
    const { chatroomId, chatroomList } = this.props;

    return (
      <div className='chat'>
        <nav className='navbar navbar-light bg-light'>
          <a className='navbar-brand' href="#">
            {
              (chatroomId) ? (
                chatroomList.filter(chatroom => chatroom['item.id'] === chatroomId).map(chatroom => {
                  return chatroom['item.name'];
                })
              ) : null
            }
          </a>
          <ul className='navbar-nav ml-auto'>
            {
              (chatroomId) ? (
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    href='#root'
                    onClick={this.logoutChatroom}
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
                onClick={this.logoutUser}
              >
                로그아웃 
              </a>
            </li>
          </ul>
        </nav>
        <Route render={({location}) => (
          <div
            className='body'
          >
            <Switch location={location}>
              <Route exact path='/chat/:userId' component={ChatList} />
              <Route path='/chat/:userId/:chatroomId' component={ChatRoom} />
            </Switch>
          </div>
          )} />
      </div>
    );
  }
}

ChatMain.propType = {
  userId: PropTypes.string,
  chatroomId: PropTypes.string,
  chatroomList: PropTypes.instanceOf(Array),
  setUserID: PropTypes.func,
  setChatroomID: PropTypes.func,
};

ChatMain.defaultProps = {
  userId: '',
  chatroomId: '',
  chatroomList: [],
  setUserID: () => {},
  setChatroomID: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMain);