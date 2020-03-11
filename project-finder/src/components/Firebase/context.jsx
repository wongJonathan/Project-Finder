import React from 'react';

const FirebaseContext = React.createContext(null);

// Allows firebase to be passed down to child components
export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
