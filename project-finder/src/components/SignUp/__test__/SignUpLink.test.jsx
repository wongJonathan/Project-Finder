import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

import SignUpLink from '../SignUpLink';
import { SIGN_UP } from '../../../constants/routes';


describe('Sign Up Link', () => {
  it('Should redirect on sign up click', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <SignUpLink />
      </Router>,
    );

    expect(getByText('Sign Up')).not.toBeNull();

    fireEvent.click(getByText('Sign Up'));

    expect(history.location.pathname).toBe(SIGN_UP);
  });
});
