import React from 'react';

import { withAuthorization } from '../Session';


const HomePage = () => (
  <div>
    <h1>Home</h1>
  </div>
);

const condition = (authUser) => {
  console.log(authUser);
  return !!authUser;
};

export default withAuthorization(condition)(HomePage);