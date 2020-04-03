import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import AppFooter from '../appHeader';


describe('App Footer', () => {
  const headerRender = (history) => render(
    <Router history={history}>
      <AppFooter />
    </Router>,
  );

  it('Should render ', () => {
    const { getByText } = headerRender(createMemoryHistory());

    expect(getByText('Squad')).not.toBeNull();
  });
});
