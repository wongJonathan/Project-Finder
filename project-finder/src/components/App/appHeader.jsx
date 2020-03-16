import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import PropTypes from 'prop-types';
import './appHeader.sass';
import { LANDING, SIGN_IN } from '../../constants/routes';

const AppHeaderBase = ({ history }) => {
  const [displayLogin, setDisplayLogin] = useState(true);

  useEffect(() => {
    setDisplayLogin(history.location.pathname === LANDING);
  }, [history.location.pathname]);

  const onClickLogin = () => {
    history.push(SIGN_IN);
  };

  return (
    <div className="app-header">
      <div>
        Squad
      </div>
      {
        displayLogin && (
          <button type="button" onClick={onClickLogin}>
            Login
          </button>
        )
      }
    </div>
  );
};

AppHeaderBase.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const AppHeader = compose(
  withRouter,
)(AppHeaderBase);

export default AppHeader;
