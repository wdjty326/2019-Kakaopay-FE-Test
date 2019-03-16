import React from 'react';
import configureStore from 'redux-mock-store' 
import Logon from '../../../main/js/component/logon';

const initialState = {
  userId: '',
}; 
const mockStore = configureStore();

beforeEach(() => {
  const store = mockStore(initialState)

  describe('Logon 컴포넌트', () => {
    it('Logon 래퍼를 그립니다.', () => {
      const wrapper = shallow(<Logon store={store}/>);
      expect(wrapper.find('.logon')).to.have.length(2);
    });
  });
});
