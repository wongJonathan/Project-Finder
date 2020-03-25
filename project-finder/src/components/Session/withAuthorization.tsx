import React, {
  ComponentClass,
  ReactElement,
  useContext,
  useEffect,
} from 'react';
import { withRouter } from 'react-router-dom';
import { User } from 'firebase';

import Firebase, { FirebaseContext } from '../Firebase';
import { SIGN_IN } from '../../constants/routes';
import AuthUserContext from './context';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { History } from '../../types';


type conditionType = (condition: User | null) => boolean;

const withAuthorization = (condition: conditionType) => (
  Component: React.ComponentType,
): ComponentClass => {
  const WithAuthorization = ({ history }: { history: History}): ReactElement => {
    const firebase = useContext<Firebase>(FirebaseContext);
    const authContext = useContext<User | null>(AuthUserContext);

    useEffect(() => (
      firebase.auth.onAuthStateChanged(
        (authUser) => {
          if (!condition(authUser)) {
            history.push(SIGN_IN);
          }
        },
      )
    ), [firebase.auth, history]);

    return (
      <div>
        {condition(authContext) ? <Component /> : null}
      </div>
    );
  };

  return withRouter(WithAuthorization);
};

export default withAuthorization;
