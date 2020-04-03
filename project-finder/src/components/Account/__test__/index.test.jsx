import React from 'react';
import { render } from '@testing-library/react';
import AccountPage from '../index';
import { AuthUserContext } from '../../Session';

jest.mock('../../PasswordChange', () => () => null);
jest.mock('../../PasswordForget/PasswordForgetForm', () => () => null);
jest.mock('../../Session/withAuthorization', () => (condition) => {
  condition(null);
  return (component) => component;
});

describe('Account page', () => {
  const accountRender = (user) => render(
    <AuthUserContext.Provider value={user}>
      <AccountPage />
    </AuthUserContext.Provider>,
  );

  it('Should render and display account info', () => {
    const mockUser = {
      email: 'test',
    };
    const { getByText } = accountRender(mockUser);

    expect(getByText(/test/)).not.toBeNull();
  });
});
