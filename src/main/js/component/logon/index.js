import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../../store/action';

const mapDispatchToProps = (dispatch) => ({
  setUserID: (userId = '') => dispatch(action.setUserID(userId)),
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
    const { setUserID } = this.props;

    setUserID(userId);
  }

  render() {
    const { userId } = this.state;
    return (
      <div>
        <form onSubmit={this.onSumbitLogon}>
          <input type="text" onChange={this.onChangeUserId} value={userId} />
          <button type="submit">저장</button>
        </form>
      </div>
    );
  }
}

Logon.propTypes = {
  setUserID: PropTypes.func,
};

Logon.defaultProps = {
  setUserID: () => {},
};

export default connect(null, mapDispatchToProps)(Logon);
