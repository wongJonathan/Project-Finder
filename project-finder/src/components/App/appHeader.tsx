import React, { useState, useEffect, ReactElement } from 'react';
import { withRouter } from 'react-router-dom';

import './appHeader.sass';
import { LANDING, SIGN_IN } from '../../constants/routes';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { History } from '../../types';

interface AppHeaderProps {
  history: History;
}


const AppHeader = ({ history }: AppHeaderProps): ReactElement => {
  const [displayLogin, setDisplayLogin] = useState(true);

  useEffect(() => {
    setDisplayLogin(history.location.pathname === LANDING);
  }, [history.location.pathname]);

  const onClickLogin = (): void => {
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

export default withRouter(AppHeader);
