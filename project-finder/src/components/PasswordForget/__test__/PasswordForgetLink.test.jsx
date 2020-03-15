import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

import { PASSWORD_FORGET } from '../../../constants/routes';
import PasswordForgetLink from '../PasswordFogetLink';


describe('Password Forget Link', () => {
  it('Should redirect on link click', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <PasswordForgetLink />
      </Router>,
    );

    const link = getByText('Forgot Password?');
    expect(link).not.toBeNull();

    fireEvent.click(link);

    expect(history.location.pathname).toBe(PASSWORD_FORGET);
  });
});
