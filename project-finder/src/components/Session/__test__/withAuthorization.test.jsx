import React from 'react';
import { render, wait } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Firebase, { FirebaseContext } from '../../Firebase';
import AuthUserContext from '../context';
import { withAuthorization } from '../index';
import createUserInfo from '../mocks/createUserInfo';
import { SIGN_IN } from '../../../constants/routes';

jest.mock('../../Firebase/firebase');


const TestComponent = () => (
  <div>
    Rendered
  </div>
);

describe('With  Authorization', () => {
  const renderAuth = (condition, authUser, firebase) => {
    const AuthorizedComponent = withAuthorization(condition)(TestComponent);
    const history = createMemoryHistory();
    return [render(
      <AuthUserContext.Provider value={authUser}>
        <FirebaseContext.Provider value={firebase}>
          <Router history={history}>
            <AuthorizedComponent />
          </Router>
        </FirebaseContext.Provider>
      </AuthUserContext.Provider>,
    ), history];
  };
  const testCondition = (user) => user && user.uid === '1';

  let callbackFunc;

  beforeEach(() => {
    callbackFunc = null;
    Firebase.prototype.onAuthStateChanged = jest.fn((callback) => {
      callbackFunc = callback;
    });
  });

  it('Should render component only if it has authorization, otherwise redirect', () => {
    const { getByText } = renderAuth(testCondition, createUserInfo(), new Firebase())[0];
    callbackFunc(createUserInfo());
    expect(getByText('Rendered')).not.toBeNull();
  });

  it('Should kick user to sign in if it loses authorization', async () => {
    const testHelper = renderAuth(testCondition, createUserInfo(), new Firebase());
    const { getByText } = testHelper[0];
    const history = testHelper[1];

    expect(getByText('Rendered')).not.toBeNull();

    callbackFunc(null);
    await wait();

    expect(history.location.pathname).toBe(SIGN_IN);
  });

  it('Should not render a component if its not authorized', () => {
    const { queryByText } = renderAuth(testCondition, null, new Firebase())[0];
    expect(queryByText('Rendered')).toBeNull();
  });
});
