import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent, render, wait } from '@testing-library/react';

import { HOME } from '../../../constants/routes';
import Firebase, { FirebaseContext } from '../../Firebase';
import SignInForm from '../SignInForm';

jest.mock('../../Firebase/firebase');

describe('Sign In Form', () => {
  const signInMock = jest.fn();

  let history;
  let signInRender;

  beforeEach(() => {
    signInMock.mockReset();

    Firebase.prototype.doSignInWithEmailAndPassword = signInMock;

    history = createMemoryHistory();

    signInRender = render(
      <FirebaseContext.Provider value={new Firebase()}>
        <Router history={history}>
          <SignInForm />
        </Router>
      </FirebaseContext.Provider>,
    );
  });

  it('Should be able to sign in with valid inputs', async () => {
    signInMock.mockResolvedValue(null);
    const { getByPlaceholderText, getByText } = signInRender;

    const email = getByPlaceholderText('Email Address');
    const password = getByPlaceholderText('Password');

    fireEvent.change(email, { target: { value: 'email' } });
    fireEvent.change(password, { target: { value: 'password' } });

    fireEvent.click(getByText('Sign In'));

    await wait();

    expect(signInMock.mock.calls.length).toBe(1);
    expect(signInMock.mock.calls[0]).toEqual(['email', 'password']);
    expect(history.location.pathname).toBe(HOME);
  });

  it('Should disable sign in if form is empty', () => {
    const { getByText } = signInRender;

    fireEvent.click(getByText('Sign In'));

    expect(signInMock.mock.calls.length).toBe(0);
  });

  it('Should display error', async () => {
    signInMock.mockRejectedValueOnce({
      message: 'Invalid login',
    });
    const { getByPlaceholderText, getByText } = signInRender;

    const email = getByPlaceholderText('Email Address');
    const password = getByPlaceholderText('Password');

    fireEvent.change(email, { target: { value: 'email' } });
    fireEvent.change(password, { target: { value: 'password' } });

    fireEvent.click(getByText('Sign In'));

    await wait();

    expect(getByText('Invalid login')).not.toBeNull();
  });
});
