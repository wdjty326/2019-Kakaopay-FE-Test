import React from 'react';
import configureStore from 'redux-mock-store' 
import ChatRoom from '../../../main/js/component/chat/chatRoom';

const initialState = {
  userId: 'test',
  chatroomId: '',
}; 
const mockStore = configureStore();

beforeEach(() => {
  const store = mockStore(initialState)

  describe('ChatRoom 컴포넌트', () => {
    it('ChatRoom 래퍼를 그립니다.', () => {
      const wrapper = shallow(<ChatRoom store={store}/>);
      expect(wrapper.find('.cacheList')).to.have.length(1);
    });
  });
});
