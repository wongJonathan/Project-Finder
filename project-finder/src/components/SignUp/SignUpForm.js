import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import {withFirebase} from "../Firebase";
import {HOME} from "../../constants/routes";


const initialState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
};

const SignUpFormBase = (props) => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [error, setError] = useState(null);
  const [invalid, setInvalid] = useState(false);

  const onSubmit = (event) => {
    props.firebase
      .doCreateUserWithEmailAndPassword(userInfo.email, userInfo.passwordOne)
      .then(authUser => {
        setUserInfo(initialState);
        props.history.push(HOME);
      })
      .catch(error =>{
        setError(error);
      });

    event.preventDefault();
  };

  const onChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    setInvalid(
      userInfo.passwordOne !== userInfo.passwordTwo ||
      userInfo.passwordOne === '' ||
      userInfo.email === '' ||
      userInfo.username === ''
    );
    console.log(userInfo);
  }, [userInfo]);

  return (
    <form onSubmit={onSubmit}>
        <input
          name="username"
          value={userInfo.username}
          onChange={onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={userInfo.email}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={userInfo.passwordOne}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={userInfo.passwordTwo}
          onChange={onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={invalid} type="submit">Sign Up</button>
        {error && <p>{error.message}</p>}
    </form>
  )
};

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;