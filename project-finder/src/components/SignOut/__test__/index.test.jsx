import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import SignOutButton from '../index';
import Firebase from '../../Firebase/firebase';
import { FirebaseContext } from '../../Firebase';

jest.mock('../../Firebase/firebase');

describe('Sign out button', () => {
  beforeEach(() => {
    Firebase.mockClear();
  });

  it('should sign out on press', () => {
    const mockFirebase = new Firebase();
    const { getByText } = render(
      <FirebaseContext.Provider value={mockFirebase}>
        <SignOutButton />
      </FirebaseContext.Provider>,
    );

    const signOutButton = getByText('Sign Out');

    expect(signOutButton).not.toBeNull();

    fireEvent.click(signOutButton);

    expect(mockFirebase.doSignOut.mock.calls.length).toBe(1);
  });
});
