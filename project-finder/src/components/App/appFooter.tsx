import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import './appFooter.sass';
import { LANDING } from '../../constants/routes';

const AppFooter = (): ReactElement => (
  <div className="app-footer">
    <h2>
      Squad
    </h2>
    <Link to={LANDING}>About</Link>
    <Link to={LANDING}>Members</Link>
    <Link to={LANDING}>User Agreement</Link>
  </div>
);

export default AppFooter;
