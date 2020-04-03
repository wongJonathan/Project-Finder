import React from 'react';
import { render } from '@testing-library/react';

import PasswordForgetPage from '../index';


describe('Password Forget', () => {
  it('Should render', () => {
    render(<PasswordForgetPage />);
  });
});
