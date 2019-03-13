import {
  SET_USERID,
  SET_CHATROOMID,
} from '../type';

/**
 * 사용자 ID를 설정
 * @param {사용자ID} userId 
 */
export const setUserID = (userId = '') => ({
  type: SET_USERID,
  userId,
});

/**
 * 
 * @param {채팅방ID} chatroomId
 */
export const setChatroomID = (chatroomId = '') => ({
  type: SET_CHATROOMID,
  chatroomId,
});
