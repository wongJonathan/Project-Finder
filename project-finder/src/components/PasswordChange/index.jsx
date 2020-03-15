import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withFirebase } from '../Firebase';


const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
};

const PasswordChangeForm = (props) => {
  const [passwords, setPasswords] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [isInvalid, setInvalid] = useState(false);

  const onSubmit = (event) => {
    props.firebase
      .doPasswordUpdate(passwords.passwordOne)
      .then(() => {
        setPasswords(INITIAL_STATE);
      })
      .catch((errorMsg) => {
        setError(errorMsg);
      });
    event.preventDefault();
  };

  const onChange = (event) => {
    setPasswords({
      ...passwords,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setInvalid(passwords.passwordOne !== passwords.passwordTwo || passwords.passwordOne === '');
  }, [passwords]);

  return (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        value={passwords.passwordOne}
        onChange={onChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwords.passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Change password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

PasswordChangeForm.propTypes = {
  firebase: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withFirebase(PasswordChangeForm);
