import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as action from '../../store/action';

const mapStateToProps = (state) => {
  const { userId } = state;
  return {
    userId,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setUserID: (userId = null) => dispatch(action.setUserID(userId)),
});
/**
 * logon 페이지
 */
class Logon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: ''
    };
  }

  /**
   * 유저ID 적용
   */
  onChangeUserId = (event) => {
    const { target } = event;
    this.setState({
      userId: target.value,
    });
  }

  onSumbitLogon = (event) => {
    event.preventDefault();
    const { userId } = this.state;
    const { history } = this.props;
    
    // userid 자리수 체크
    if (userId.trim().length > 0) {
      const { setUserID } = this.props;
      setUserID(userId);

      history.replace(`/chat/${userId}`);
    }
  }

  render() {
    const { userId } = this.state;
    return (
      <div className='logon'>
        <div>
          <FontAwesomeIcon icon='comment' />
        </div>
        <form onSubmit={this.onSumbitLogon}>
          <div className='form-group'>
            <input name='userId' className='form-control' placeholder='사용자ID' type='text' onChange={this.onChangeUserId} value={userId} />
          </div>
          <div className='form-group'>
            <button className='btn btn-block btn-third btn-lg' type='submit'>로그인</button>
          </div>
        </form>
      </div>
    );
  }
}

Logon.propTypes = {
  userId: PropTypes.string,
  setUserID: PropTypes.func,
};

Logon.defaultProps = {
  userId: null,
  setUserID: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Logon);
