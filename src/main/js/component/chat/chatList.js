import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as action from '../../store/action';

const mapStateToProps = (state) => {
  const { userId, chatroomId, chatroomList } = state;
  return {
    userId,
    chatroomId,
    chatroomList,
  };
}

const mapDispatchToProps = dispatch => ({
  setChatroomID: (chatroomId = '') => dispatch(action.setChatroomID(chatroomId)),
  setChatroomList: () => dispatch(action.setChatroomList()),
})

/**
 * 채팅방 리스트
 */
class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseover: '',
    };
    props.setChatroomList();
  }

  onSelectedChatRoom = (chatroomId) => {
    const { userId, setChatroomID, history } = this.props;
    setChatroomID(chatroomId);

    history.replace(`/chat/${userId}/${chatroomId}`);
  }

  onMouseEventChatRoom = (chatroomId = '') => {
    this.setState({
      mouseover: chatroomId,
    })
  };

  render() {
    const { mouseover } = this.state;
    const { chatroomList } = this.props;
    return (
      <div>
        <ul className='list-group'>
          {
            chatroomList.map((chatroom) => (
              <li
                className={`list-group-item ${(mouseover === chatroom['item.id']) ? 'active' : ''}`}
                key={chatroom['item.id']}
                onClick={() => this.onSelectedChatRoom(chatroom['item.id'])}
                onMouseOver={() => this.onMouseEventChatRoom(chatroom['item.id'])}
                onMouseOut={() => this.onMouseEventChatRoom()}
              >
                <FontAwesomeIcon icon={['fab', chatroom['item.icon']]} />{' '}
                {chatroom['item.name']}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

ChatList.propTypes = {
  userId: PropTypes.string,
  chatroomId: PropTypes.string,
  chatroomList: PropTypes.instanceOf(Array),
  setChatroomID: PropTypes.func,
  setChatroomList: PropTypes.func,
};

ChatList.defaultProps = {
  userId: '',
  chatroomId: '',
  chatroomList: [],
  setChatroomID: () => {},
  setChatroomList: () => {},
};


export default connect(mapStateToProps, mapDispatchToProps)(ChatList);