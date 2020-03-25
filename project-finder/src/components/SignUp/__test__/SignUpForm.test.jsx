import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import {
  fireEvent,
  render,
  act,
  wait,
} from '@testing-library/react';

import { HOME } from '../../../constants/routes';
import Firebase from '../../Firebase/firebase';
import { FirebaseContext } from '../../Firebase';
import SignUpForm from '../SignUpForm';

jest.mock('../../Firebase/firebase');

describe('Sign Up Form', () => {
  const inputs = ['First Name', 'Last Name', 'Email Address', 'Password', 'Confirm Password'];

  const mockEmailAndPassword = jest.fn();
  const mockUser = jest.fn();
  let history;
  let signUpFormRender;

  beforeEach(() => {
    mockEmailAndPassword.mockClear();
    mockUser.mockClear();

    Firebase.prototype.doCreateUserWithEmailAndPassword = mockEmailAndPassword;
    Firebase.prototype.user = mockUser;

    history = createMemoryHistory();

    signUpFormRender = render(
      <FirebaseContext.Provider value={new Firebase()}>
        <Router history={history}>
          <SignUpForm />
        </Router>
      </FirebaseContext.Provider>,
    );
  });

  it('Should be able to create an account, set info to db, and redirect to home', async () => {
    const mockSet = jest.fn();
    const userPromise = Promise.resolve({
      user: {
        uid: 123,
      },
    });

    mockEmailAndPassword.mockResolvedValueOnce(userPromise);
    mockUser.mockImplementationOnce(() => ({
      set: mockSet,
    }));

    const { getByPlaceholderText, getByText } = signUpFormRender;

    const inputLocations = inputs.map((placeholder) => {
      const input = getByPlaceholderText(placeholder);
      expect(input).not.toBeNull();
      return input;
    });

    // sets all inputs to 'test'
    inputLocations.forEach((input) => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    fireEvent.click(getByText('Create'));

    expect(mockEmailAndPassword.mock.calls.length).toBe(1);
    expect(mockEmailAndPassword.mock.calls[0])
      .toEqual(['test', 'test']);

    await act(() => userPromise);

    expect(mockSet.mock.calls[0][0]).toEqual({
      firstName: 'test',
      lastName: 'test',
      email: 'test',
    });

    expect(history.location.pathname).toBe(HOME);
  });

  it('Should be able to prevent creation based on invalid info', () => {
    const { getByPlaceholderText, getByText } = signUpFormRender;

    const inputLocations = inputs.map((placeholder) => {
      const input = getByPlaceholderText(placeholder);
      expect(input).not.toBeNull();
      return input;
    });

    inputLocations.forEach((input, index) => {
      fireEvent.change(input, { target: { value: inputs[index] } });
    });

    fireEvent.click(getByText('Create'));

    expect(mockEmailAndPassword.mock.calls.length).toBe(0);
  });

  it('Should display an error message if something went wrong', async () => {
    const userPromise = Promise.resolve(null);
    mockEmailAndPassword.mockResolvedValueOnce(userPromise);

    const { getByPlaceholderText, getByText } = signUpFormRender;

    const inputLocations = inputs.map((placeholder) => {
      const input = getByPlaceholderText(placeholder);
      expect(input).not.toBeNull();
      return input;
    });

    inputLocations.forEach((input) => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    fireEvent.click(getByText('Create'));

    await wait();

    expect(getByText('Cannot create a new account at this time.')).not.toBeNull();
  });
});
