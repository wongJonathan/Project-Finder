import React, { useContext } from 'react';

import PasswordForgotForm from '../PasswordForget/PasswordForgetForm';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';


const AccountPage = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <div>
      <h1>
        Account:
        {authUser.email}
      </h1>
      <PasswordForgotForm />
      <PasswordChangeForm />
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
