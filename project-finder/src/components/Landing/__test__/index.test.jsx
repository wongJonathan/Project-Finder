import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import LandingPage from '../index';
import { SIGN_UP } from '../../../constants/routes';


describe('Landing Page', () => {
  let history;
  let landingRender;

  beforeEach(() => {
    history = createMemoryHistory();

    landingRender = render(
      <Router history={history}>
        <LandingPage />
      </Router>,
    );
  });

  it('Should render and navigate when pressing join button', () => {
    const { getByText } = landingRender;

    const joinButton = getByText('Join Squad');

    fireEvent.click(joinButton);

    expect(history.location.pathname).toBe(SIGN_UP);
  });
});
