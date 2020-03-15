import React from 'react';
import { render } from '@testing-library/react';

import SignUpPage from '../index';

jest.mock('../SignUpForm', () => jest.fn().mockImplementation(() => <div>Sign up form</div>));

describe('Sign Up Page', () => {
  it('Should render sign up page', () => {
    const { getByText } = render(<SignUpPage />);
    expect(getByText('Create account')).not.toBeNull();
  });
});
