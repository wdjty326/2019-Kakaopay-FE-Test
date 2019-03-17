import reducer from '../../../../main/js/store/reducer';
import * as type from '../../../../main/js/store/type';

/**
 * reducer 테스트 코드
 */
describe('reducer 테스트', () => {
  it('userid reducer 적용', () => {
    expect(
      reducer({
        userId: '',
      }, {
        type: type.SET_USERID,
        userId: 'test',
      })
    ).to.deep.equal({
      userId: 'test',
    });
  });

  it('chatroomid reducer 적용', () => {
    expect(
      reducer({
        chatroomId: '',
      }, {
        type: type.SET_CHATROOMID,
        chatroomId: 'test',
      })
    ).to.deep.equal({
      chatroomId: 'test',
    });
  });

  it('chatroomList reducer 적용', () => {
    expect(
      reducer({
        chatroomList: [],
      }, {
        type: type.SET_CHATROOM_LIST,
        chatroomList: [
          { 'test' : 'test' },
        ],
      })
    ).to.deep.equal({
      chatroomList: [
        { 'test' : 'test' },
      ],
    });
  });
});
