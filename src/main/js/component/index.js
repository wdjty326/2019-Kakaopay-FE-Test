import React, { Component, Fragment } from 'react';
import Logon from './logon';
import ChatMain from './chat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
  const { userId } = state;
  return {
    userId,
  };
}

class App extends Component {
  render() {
    const { userId } = this.props;

    return (
      <Fragment>
        {
          (userId) ? <ChatMain /> : <Logon />
        }
      </Fragment>
    );
  }
}

App.propTypes = {
  userId: PropTypes.string,
};

App.defaultProps = {
  userId: null,
};

export default connect(mapStateToProps)(App);
