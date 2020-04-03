import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import AppHeader from '../appHeader';
import { LANDING, SIGN_IN } from '../../../constants/routes';


describe('App Header', () => {
  const headerRender = (history) => render(
    <Router history={history}>
      <AppHeader />
    </Router>,
  );

  it('Should render name with no login', () => {
    const { getByText } = headerRender(createMemoryHistory());

    expect(getByText('Squad')).not.toBeNull();
  });

  it('Should display login button if in correct path', () => {
    const withLandingHistory = createMemoryHistory();
    withLandingHistory.location.pathname = LANDING;

    const { getByText } = headerRender(withLandingHistory);

    const loginButton = getByText('Login');

    expect(loginButton).not.toBeNull();

    fireEvent.click(loginButton);

    expect(withLandingHistory.location.pathname).toBe(SIGN_IN);
  });
});
