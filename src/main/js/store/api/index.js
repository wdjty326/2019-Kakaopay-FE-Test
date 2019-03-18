import axios from 'axios';

// 서버 URL
const url = '';

/**
 * 채팅방 리스트 정보 조회
 */
export const getChatroomList = async (callback = () => {}) => {
  return await axios.get(`${url}/api/chatroom`).then(response => {
    callback(response.data);
  }).catch((error) => {
    console.log(error);
  });
};

export const uploadImageFile = async (file, callback = () => {}) => {
  const formData = new FormData();
  formData.append('file', file);

  return await axios.post(`${url}/api/uploadFile`, formData, {
    headers : {
      'Content-Type': 'multipart/form-data',
    }
  }).then(response => {
    callback(response.data);
  }).catch((error) => {
    console.log(error);
  });
}
