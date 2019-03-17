import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChatRoom from '../../../../main/js/component/chat/chatRoom';

describe('ChatRoom 컴포넌트', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store = null;
  let wrapper = null;

  beforeEach(() => {
    const initialState = {
      userId: 'test',
      chatroomId: '',
    }; 
    store = mockStore(initialState);
    // 웹소켓 연결로 테스트가 종료되지 않은 현상
    wrapper = shallow(<Provider store={store}><ChatRoom /></Provider>);
  });
  
  it('ChatRoom 래퍼를 그립니다.', () => {
    // expect(wrapper.find('.cacheList')).to.have.length(1);
  });

  it('ChatRoom 컴포넌트에서 socket연결을 확인합니다.', () => {

  });

  it('ChatRoom 컴포넌트에서 메세지를 입력합니다.', () => {

  });

  it('ChatRoom 컴포넌트에서 이미지를 선택합니다.', () => {

  });

  it('ChatRoom 컴포넌트에서 메세지를 보냅니다.', () => {

  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });
});