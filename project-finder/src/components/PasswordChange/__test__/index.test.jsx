import React from 'react';
import { render } from '@testing-library/react';

import PasswordChangeForm from '../index';
import Firebase from '../../Firebase/firebase';
import { FirebaseContext } from '../../Firebase';

jest.mock('../../Firebase/firebase');

describe('Password Change Form', () => {
  let passwordChangeForm;
  let mockFirebase;

  beforeEach(() => {
    Firebase.mockClear();
    mockFirebase = new Firebase();
    passwordChangeForm = (
      <FirebaseContext.Provider value={mockFirebase}>
        <PasswordChangeForm />
      </FirebaseContext.Provider>
    );
  });

  it('should render', () => {
    const { getByPlaceholderText } = render(passwordChangeForm);

    expect(getByPlaceholderText('New Password')).not.toBeNull();
    expect(getByPlaceholderText('Confirm New Password')).not.toBeNull();
  });
});
