import React from 'react';
import { render } from '@testing-library/react';

import HomePage from '../index';

jest.mock('../../Session/withAuthorization', () => (condition) => {
  condition(null);
  return (component) => component;
});


describe('Home Page', () => {
  it('Should render', () => {
    render(<HomePage />);
  });
});
