import React, { ReactElement } from 'react';
import { User } from 'firebase';

import { withAuthorization } from '../Session';


const HomePage = (): ReactElement => (
  <div>
    <h1>Home</h1>
  </div>
);

const condition = (authUser: User | null): boolean => !!authUser;

export default withAuthorization(condition)(HomePage);
