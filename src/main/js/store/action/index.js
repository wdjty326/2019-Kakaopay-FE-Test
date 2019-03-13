import {
  SET_USERID,
  SET_CHATROOMID,
  SET_CHATROOM_LIST,
} from '../type';
import * as api from '../api';

/**
 * 사용자 ID를 설정
 * @param {사용자ID} userId 
 */
export const setUserID = (userId = null) => ({
  type: SET_USERID,
  userId,
});

/**
 * 
 * @param {채팅방ID} chatroomId
 */
export const setChatroomID = (chatroomId = null) => ({
  type: SET_CHATROOMID,
  chatroomId,
});

/**
 * 채팅방 리스트 설정
 */
export const setChatroomList = () => dispatch => {
  const callback = (data) => {
    dispatch({
      type: SET_CHATROOM_LIST,
      chatroomList: data,
    });
  };

  api.getChatroomList(callback);
};