
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';


const PasswordForgetFormBase = (props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isInvalid, setInvalid] = useState(false);

  const onSubmit = (event) => {
    props.firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail('');
        setError(null);
      })
      .catch((errorMsg) => {
        setError(errorMsg);
      });

    event.preventDefault();
  };

  const onChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    setInvalid(email === '');
  }, [email]);

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

PasswordForgetFormBase.propTypes = {
  firebase: PropTypes.elementType.isRequired,
};

const PasswordForgotForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgotForm;
