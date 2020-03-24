import React from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext();

// Allows firebase to be passed down to child components
export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
