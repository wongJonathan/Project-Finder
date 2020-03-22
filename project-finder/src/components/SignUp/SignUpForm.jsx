import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { withFirebase } from '../Firebase';
import { HOME } from '../../constants/routes';
import './SignUpForm.sass';


const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
};

const SignUpFormBase = (props) => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [invalid, setInvalid] = useState(false);

  const onSubmit = (event) => {
    props.firebase
      .doCreateUserWithEmailAndPassword(userInfo.email, userInfo.passwordOne)
      .then((authUser) => props.firebase
        .user(authUser.user.uid)
        .set({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
        }))
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

SignUpFormBase.propTypes = {
  firebase: PropTypes.oneOfType([PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;
