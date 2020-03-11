import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { HOME } from '../../constants/routes';


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInFormBase = (props) => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(true);

  const onSubmit = (event) => {
    props.firebase
      .doSignInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(() => {
        setUserInfo(INITIAL_STATE);
        props.history.push(HOME);
      })
      .catch((errorMsg) => {
        setError(errorMsg);
      });

    event.preventDefault();
  };

  const onChange = (event) => {
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

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInForm;
