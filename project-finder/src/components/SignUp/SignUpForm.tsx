import React, {
  useState,
  useEffect,
  useContext,
  ChangeEvent, ReactElement,
} from 'react';
import { withRouter } from 'react-router-dom';
import firebase, { FirebaseError } from 'firebase';

import Firebase, { FirebaseContext } from '../Firebase';
import { HOME } from '../../constants/routes';
import './SignUpForm.sass';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { History } from '../../types';

interface SignUpFormProps {
  history: History;
}


const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
};

const SignUpForm = ({ history }: SignUpFormProps): ReactElement => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);
  const [error, setError] = useState<FirebaseError | null>(null);
  const [invalid, setInvalid] = useState(false);
  const firebaseContext = useContext<Firebase>(FirebaseContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    firebaseContext
      .doCreateUserWithEmailAndPassword(userInfo.email, userInfo.passwordOne)
      .then((authUser: firebase.auth.UserCredential) => {
        if (authUser.user) {
          return firebaseContext
            .user(authUser.user.uid)
            .set({
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              email: userInfo.email,
            });
        }
        return Promise.resolve();
      })
      .then(() => {
        setUserInfo(INITIAL_STATE);
        history.push(HOME);
      })
      .catch((errorMsg: FirebaseError) => {
        setError(errorMsg);
      });

    event.preventDefault();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setInvalid(
      userInfo.passwordOne !== userInfo.passwordTwo
      || userInfo.passwordOne === ''
      || userInfo.email === ''
      || userInfo.firstName === ''
      || userInfo.lastName === '',
    );
  }, [userInfo]);

  return (
    <form id="signup" className="signup-form" onSubmit={onSubmit}>
      <input
        form="signup"
        name="firstName"
        value={userInfo.firstName}
        onChange={onChange}
        type="text"
        placeholder="First Name"
      />
      <input
        form="signup"
        name="lastName"
        value={userInfo.lastName}
        onChange={onChange}
        type="text"
        placeholder="Last Name"
      />
      <input
        form="signup"
        name="email"
        value={userInfo.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        form="signup"
        name="passwordOne"
        value={userInfo.passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        form="signup"
        name="passwordTwo"
        value={userInfo.passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button form="signup" className="signup-submit" disabled={invalid} type="submit">Create</button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default withRouter(SignUpForm);
