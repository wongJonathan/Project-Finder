import React, {
  useState,
  useEffect,
  ChangeEvent,
  useContext, ReactElement,
} from 'react';

import { FirebaseError } from 'firebase';
import Firebase, { FirebaseContext } from '../Firebase';


interface PasswordType {
  passwordOne: string;
  passwordTwo: string;
}


const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
};

const PasswordChangeForm = (): ReactElement => {
  const [passwords, setPasswords] = useState<PasswordType>(INITIAL_STATE);
  const [error, setError] = useState<FirebaseError | null>(null);
  const [isInvalid, setInvalid] = useState(false);
  const firebase = useContext<Firebase>(FirebaseContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    firebase
      .doPasswordUpdate(passwords.passwordOne)
      .then(() => {
        setPasswords(INITIAL_STATE);
      })
      .catch((errorMsg: FirebaseError) => {
        setError(errorMsg);
      });
    event.preventDefault();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
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

export default PasswordChangeForm;
