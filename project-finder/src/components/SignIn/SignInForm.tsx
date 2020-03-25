import React, {
  useEffect,
  useState,
  useContext,
  ChangeEvent, ReactElement,
} from 'react';
import { withRouter } from 'react-router-dom';

import { FirebaseError } from 'firebase';
import Firebase, { FirebaseContext } from '../Firebase';
import { HOME } from '../../constants/routes';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { History } from '../../types';

interface SignInProps {
  history: History;
}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInForm = ({ history }: SignInProps): ReactElement => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);
  const [error, setError] = useState<FirebaseError | null>(null);
  const [valid, setValid] = useState(true);
  const firebase = useContext<Firebase>(FirebaseContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    firebase
      .doSignInWithEmailAndPassword(userInfo.email, userInfo.password)
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
    setValid(userInfo.password === '' || userInfo.email === '');
  }, [userInfo]);

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={userInfo.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={userInfo.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={valid} type="submit">
        Sign In
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default withRouter(SignInForm);
