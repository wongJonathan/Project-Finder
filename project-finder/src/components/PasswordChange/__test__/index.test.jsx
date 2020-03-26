import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';

import PasswordChangeForm from '../index';
import Firebase from '../../Firebase/firebase';
import { FirebaseContext } from '../../Firebase';

jest.mock('../../Firebase/firebase');

describe('Password Change Form', () => {
  const passwordUpdateMock = jest.fn();
  const passwordChangeRender = (firebase) => render(
    <FirebaseContext.Provider value={firebase}>
      <PasswordChangeForm />
    </FirebaseContext.Provider>,
  );

  beforeEach(() => {
    passwordUpdateMock.mockReset();
    Firebase.prototype.doPasswordUpdate = passwordUpdateMock;
  });

  it('Should be able to change password', async () => {
    passwordUpdateMock.mockResolvedValueOnce(null);
    const { getByPlaceholderText, getByText } = passwordChangeRender(new Firebase());

    fireEvent.change(getByPlaceholderText('New Password'), { target: { value: 'test' } });
    fireEvent.change(getByPlaceholderText('Confirm New Password'), { target: { value: 'test' } });

    fireEvent.click(getByText('Change password'));

    await wait();

    expect(passwordUpdateMock.mock.calls.length).toBe(1);
    expect(passwordUpdateMock.mock.calls[0]).toEqual(['test']);
  });

  it('Should not be able to change password, if they dont match', () => {
    const { getByPlaceholderText, getByText } = passwordChangeRender(new Firebase());

    fireEvent.change(getByPlaceholderText('New Password'), { target: { value: 'test' } });
    fireEvent.change(getByPlaceholderText('Confirm New Password'), { target: { value: 'different' } });

    fireEvent.click(getByText('Change password'));

    expect(passwordUpdateMock.mock.calls.length).toBe(0);
  });

  it('Should display error if password change didnt work', async () => {
    const errorMsg = {
      message: 'Could not reset password',
    };
    passwordUpdateMock.mockRejectedValueOnce(errorMsg);
    const { getByPlaceholderText, getByText } = passwordChangeRender(new Firebase());

    fireEvent.change(getByPlaceholderText('New Password'), { target: { value: 'test' } });
    fireEvent.change(getByPlaceholderText('Confirm New Password'), { target: { value: 'test' } });

    fireEvent.click(getByText('Change password'));

    await wait();

    expect(getByText(errorMsg.message)).not.toBeNull();
  });
});
