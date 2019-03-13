import {
  SET_USERID,
  SET_CHATROOMID,
  SET_CHATROOM_LIST,
} from '../type';

const initialState = {
  userId: '', // 사용자ID
  chatroomId: '', // 채팅방ID
  chatroomList: [], // 채팅방 리스트
};

export default (state = initialState, action) => {
  const {
    type,
    userId,
    chatroomId,
    chatroomList,
  } = action;

  switch(type) {
    case SET_USERID:
      return {
        ...state,
        ...{
          userId,
        },
      };
    case SET_CHATROOMID:
      return {
        ...state,
        ...{
          chatroomId,
        },
      };
    case SET_CHATROOM_LIST:
      return {
        ...state,
        ...{
          chatroomList,
        },
      };
    default:
      return {
        ...state,
      };
  }
}