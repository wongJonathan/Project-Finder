import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import SignInPage from '../index';


describe('Sign In Page', () => {
  it('Should render', () => {
    render(
      <Router history={createMemoryHistory()}>
        <SignInPage />
      </Router>,
    );
  });
});
