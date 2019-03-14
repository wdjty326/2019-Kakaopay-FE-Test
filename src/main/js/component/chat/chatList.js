import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

    this.state = {
      mouseover: '',
    };
    props.setChatroomList();
  }

  onSelectedChatRoom = (chatroomId) => {
    const { setChatroomID } = this.props;
    setChatroomID(chatroomId);
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
                <FontAwesomeIcon icon={chatroom['item.icon']} />
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