import React, {
  useState,
  useEffect,
  ChangeEvent,
  ReactElement,
  useContext,
} from 'react';
import { FirebaseError } from 'firebase';

import Firebase, { FirebaseContext } from '../Firebase';


const PasswordForgotForm = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<FirebaseError | null>(null);
  const [isInvalid, setInvalid] = useState(false);
  const firebase = useContext<Firebase>(FirebaseContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail('');
        setError(null);
      })
      .catch((errorMsg: FirebaseError) => {
        setError(errorMsg);
      });

    event.preventDefault();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
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


export default PasswordForgotForm;
