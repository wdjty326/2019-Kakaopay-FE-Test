import axios from 'axios';

/**
 * 채팅방 리스트 정보 조회
 */
export const getChatroomList = (callback = () => {}) => {
  return axios.get("/api/chatroom").then(response => {
    callback(response.data);
  }).catch((error) => {
    console.log(error);
  });
};
