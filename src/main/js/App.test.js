import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

/**
 * UI 단위 테스트 샘플
 */
describe('<App />', () => {
  it('성공적으로 렌더링되어야 합니다.', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
  });
});
