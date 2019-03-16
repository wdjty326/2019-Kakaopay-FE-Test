import React from 'react';
import Logon from '../../../main/js/component/logon';

describe('Logon Component', () => {
  it('Counter 래퍼를 그려낸다', () => {
    const wrapper = shallow(<Logon />);
    // expect(wrapper.find(Counter)).to.have.length(1);
  });
});
