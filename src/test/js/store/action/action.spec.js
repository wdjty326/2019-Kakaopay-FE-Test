import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as action from '../../../../main/js/store/action';
import * as type from '../../../../main/js/store/type';

const promisifyMiddleware = ({dispatch, getState}) => next => action => {
  return new Promise( (resolve) => resolve(next(action)) )
};

describe('action 테스트', () => {
  const mock = new MockAdapter(axios);
  const middlewares = [promisifyMiddleware, thunk];
  const mockStore = configureMockStore(middlewares);

  afterEach(() => {
    mock.restore();
  });

  it('사용자ID 설정 액션', () => {
    const userId = 'test';
    const expectedAction = {
      type: type.SET_USERID,
      userId,
    };

    expect(action.setUserID(userId)).to.deep.equal(expectedAction);
  });

  it('채팅방ID 설정 액션', () => {
    const chatroomId = 'test';
    const expectedAction = {
      type: type.SET_CHATROOMID,
      chatroomId,
    };

    expect(action.setChatroomID(chatroomId)).to.deep.equal(expectedAction); 
  });

  it('채팅방리스트 설정 액션', () => {
    const expectedAction = {
      chatroomList: [],
    };
    
    mock.onGet('http://localhost:3000/api/chatroom').reply(200, {});
    // 테스트 코드를 어떻게 작성해야할 지 모르겠다
    (async () => { 
      try {
        const response = await axios.get('http://localhost:3000/api/chatroom');
        return response.data;
      } catch (e) {
        console.log('error:', e);
      }

      return null;
    })().then((chatroomList) => {
      const store = mockStore({ chatroomList: [] });
      (async () => await store.dispatch(action.setChatroomList()))().then(() => {
        // console.log(store.getState());
      });
      return store.dispatch(action.setChatroomList()).then(() => {
        // console.log(store.getActions);
      });
    });
    
    
    // return store.dispatch(action.setChatroomList()).then(() => {
    //   console.log(store.getState());
    //   console.log(store.getActions());
      
    //   expect(store.getActions()).to.deep.equal(expectedAction);
    // });
    // expect(expectedAction).to.deep.equal(expectedAction);
  });
  
  it('파일업로드 액션', () => {
  });
});