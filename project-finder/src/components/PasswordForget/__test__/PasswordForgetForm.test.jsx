import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';

import { HOME } from '../../../constants/routes';
import Firebase, { FirebaseContext } from '../../Firebase';
import PasswordForgotForm from '../PasswordForgetForm';

jest.mock('../../Firebase/firebase');

describe('Password Forget Form', () => {
  const passwordResetMock = jest.fn();
  const signInRender = (firebase) => render(
    <FirebaseContext.Provider value={firebase}>
      <PasswordForgotForm />
    </FirebaseContext.Provider>,
  );

  beforeEach(() => {
    passwordResetMock.mockReset();
    Firebase.prototype.doPasswordReset = passwordResetMock;
  });

  it('Should be able to submit a password reset', async () => {
    passwordResetMock.mockResolvedValue(null);
    const { getByText, getByPlaceholderText } = signInRender(new Firebase());

    fireEvent.change(getByPlaceholderText('Email Address'), { target: { value: 'test' } });
    fireEvent.click(getByText('Reset My Password'));

    // Make sure all asyncs have cleared up
    await wait();

    expect(passwordResetMock.mock.calls[0]).toEqual(['test']);
  });

  it('Should not be able to reset without putting in email', () => {
    const { getByText } = signInRender(new Firebase());

    fireEvent.click(getByText('Reset My Password'));
    expect(passwordResetMock.mock.calls.length).toBe(0);
  });

  it('Should show error message for invalid email', async () => {
    passwordResetMock.mockRejectedValueOnce({
      message: 'Email does not exist',
    });
    const { getByText, getByPlaceholderText } = signInRender(new Firebase());

    fireEvent.change(getByPlaceholderText('Email Address'), { target: { value: 'test' } });
    fireEvent.click(getByText('Reset My Password'));

    // Make sure all asyncs have cleared up
    await wait();

    expect(getByText('Email does not exist')).not.toBeNull();
  });
});
