import React, {
  ComponentType,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from 'firebase';

import AuthUserContext from './context';
import Firebase, { FirebaseContext } from '../Firebase';


const withAuthentication = (Component: ComponentType) => (): ReactElement => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const firebase = useContext<Firebase>(FirebaseContext);

  useEffect(() => (
    firebase.onAuthStateChanged((receivedUser) => {
      setAuthUser(receivedUser || null);
    })
  ), [firebase]);
  return (
    <AuthUserContext.Provider value={authUser}>
      <Component />
    </AuthUserContext.Provider>
  );
};

export default withAuthentication;
