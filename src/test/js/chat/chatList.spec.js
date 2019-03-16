import React from 'react';
import configureStore from 'redux-mock-store' 
import ChatList from '../../../main/js/component/chat/chatList';

const initialState = {
  userId: 'test',
  chatroomId: '',
  chatroomList: [
    { 'item.id': 'react', 'item.name': 'react', 'item.icon': 'react' },
    { 'item.id': 'vuejs', 'item.name': 'vuejs', 'item.icon': 'vuejs' },
  ],
}; 
const mockStore = configureStore();

beforeEach(() => {
  const store = mockStore(initialState)

  describe('ChatList 컴포넌트', () => {
    it('ChatList 래퍼를 그립니다.', () => {
      const wrapper = shallow(<ChatList store={store}/>);
      expect(wrapper.find('.list-group')).to.have.length(1);
      expect(wrapper.find('.list-group-item')).to.have.length(2);
    });
  });
});
