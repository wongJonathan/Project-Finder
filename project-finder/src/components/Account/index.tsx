import React, { ReactElement, useContext } from 'react';
import { User } from 'firebase';

import PasswordForgotForm from '../PasswordForget/PasswordForgetForm';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';


const AccountPage = (): ReactElement => {
  const authUser = useContext<User | null>(AuthUserContext);

  return (
    <div>
      {authUser && (
        <>
          <h1>
            Account:
            {authUser.email}
          </h1>
          <PasswordForgotForm />
          <PasswordChangeForm />
        </>
      )}
    </div>
  );
};

const condition = (authUser: User | null): boolean => !!authUser;

export default withAuthorization(condition)(AccountPage);
