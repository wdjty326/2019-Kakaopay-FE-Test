import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../../store/action';

const mapStateToProps = (state) => {
  const { chatroomId, chatroomList } = state;
  return {
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
    props.setChatroomList();
  }

  onSelectedChatRoom = (chatroomId) => {
    const { setChatroomID } = this.props;
    setChatroomID(chatroomId);
  }

  render() {
    const { chatroomList } = this.props;
    return (
      <ul>
        {
          chatroomList.map((chatroom) => (
            <li
              key={chatroom['item.id']}
              onClick={() => this.onSelectedChatRoom(chatroom['item.id'])}
            >
              {chatroom['item.name']}
            </li>
          ))
        }
      </ul>
    );
  }
}

ChatList.propTypes = {
  chatroomId: PropTypes.string,
  chatroomList: PropTypes.instanceOf(Array),
  setChatroomID: PropTypes.func,
  setChatroomList: PropTypes.func,
};

ChatList.defaultProps = {
  chatroomId: '',
  chatroomList: [],
  setChatroomID: () => {},
  setChatroomList: () => {},
};


export default connect(mapStateToProps, mapDispatchToProps)(ChatList);