import React from 'react';
import { render } from '@testing-library/react';

import SignUpPage from '../index';

jest.mock('../SignUpForm', () => {
  return jest.fn().mockImplementation(() => {
    return <div>Sign up form</div>;
  });
});

describe('Sign Up Page', () => {
  it('Should render sign up page', () => {
    const { getByText } = render(<SignUpPage />);
    expect(getByText('Sign Up')).not.toBeNull();
  });
});
