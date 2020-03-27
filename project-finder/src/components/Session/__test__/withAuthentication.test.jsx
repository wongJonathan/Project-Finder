import React, { useContext } from 'react';
import { render, act, wait } from '@testing-library/react';

import Firebase, { FirebaseContext } from '../../Firebase';
import AuthUserContext from '../context';
import { withAuthentication } from '../index';
import createUserInfo from '../mocks/createUserInfo';

jest.mock('../../Firebase/firebase');


const TestComponent = () => {
  const authUser = useContext(AuthUserContext);
  return (
    <div>
      {authUser && authUser.uid}
    </div>
  );
};

describe('With Authentication', () => {
  const renderAuth = (firebase) => {
    const AuthenticatedComponent = withAuthentication(TestComponent);
    return render(
      <FirebaseContext.Provider value={firebase}>
        <AuthenticatedComponent />
      </FirebaseContext.Provider>,
    );
  };

  let callbackFunc;

  beforeEach(() => {
    callbackFunc = null;
    Firebase.prototype.onAuthStateChanged = jest.fn((callback) => {
      callbackFunc = callback;
    });
  });

  it('Should be able to setup authenticated user', async () => {
    const userInfo = createUserInfo();

    const { getByText } = renderAuth(new Firebase());
    await act(() => {
      callbackFunc(userInfo);
      return Promise.resolve();
    });

    expect(getByText(userInfo.uid, { exact: false })).not.toBeNull();
  });

  it('Should be able to pass no auth user if it recieved none', async () => {
    const userInfo = createUserInfo();

    const { queryByText } = renderAuth(new Firebase());
    await act(() => {
      callbackFunc(null);
      return Promise.resolve();
    });

    expect(queryByText(userInfo.uid, { exact: false })).toBeNull();
  });
});
