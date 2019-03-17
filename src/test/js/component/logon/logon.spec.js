import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import * as action from '../../../../main/js/store/action';
import thunk from 'redux-thunk';
import Logon from '../../../../main/js/component/logon';

library.add(faComment);
describe('Logon 컴포넌트', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store = null;
  let wrapper = null;

  beforeEach(() => {
    const initialState = {
      userId: '',
    };
    
    store = mockStore(initialState);
    const props = {
      userId: '',
      setUserID: (userId = null) => store.dispatch(action.setUserID(userId)),
    };
    
    wrapper = mount(<Provider store={store}><Logon {...props} /></Provider>);
  });
  
  it('Logon 래퍼를 그립니다.', () => {
    expect(wrapper.find('.logon')).to.have.length(1);
  });

  it('Logon 컴포넌트에서 UserID를 입력합니다.', () => {
    wrapper.find('input[name="userId"]').simulate(
      'change', 
      { target: { id: 'userId', value: 'test' } }
    );
    // console.log(wrapper.find('input[name="userId"]').getElement());
    // console.log(wrapper.state());
    // expect(wrapper.state('userId')).to.equal('test');
  });

  it('Logon 컴포넌트에서 submit 동작이 발생합니다.', () => {

  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });
});
