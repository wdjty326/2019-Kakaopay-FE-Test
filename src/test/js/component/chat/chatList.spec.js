import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChatList from '../../../../main/js/component/chat/chatList';

describe('ChatList 컴포넌트', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store = null;
  let wrapper = null;

  beforeEach(() => {
    const initialState = {
      userId: 'test',
      chatroomId: '',
      chatroomList: [],
    };
    store = mockStore(initialState);
    wrapper = shallow(<Provider store={store}><ChatList /></Provider>);
  });

  it('ChatList 래퍼를 그립니다.', () => {
    // expect(wrapper.find('.list-group')).to.have.length(1);
    // expect(wrapper.find('.list-group-item')).to.have.length(2);
  });

  it('ChatList 컴포넌트에서 list에 mouseover 이벤트가 발생합니다.', () => {

  });

  it('ChatList 컴포넌트에서 list에 mouseout 이벤트가 발생합니다.', () => {

  });

  it('ChatList 컴포넌트에서 list중 하나가 선택됩니다.', () => {

  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });
});
