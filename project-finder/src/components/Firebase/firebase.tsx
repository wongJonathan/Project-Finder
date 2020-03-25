import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
  app: firebase.app.App;

  auth: firebase.auth.Auth;

  db: firebase.database.Database;

  constructor() {
    this.app = firebase.initializeApp(config);
    this.auth = this.app.auth();
    this.db = this.app.database();
  }

  // Auth API
  doCreateUserWithEmailAndPassword = (
    email: string, password: string,
  ): Promise<firebase.auth.UserCredential> => this
    .auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (
    email: string, password: string,
  ): Promise<firebase.auth.UserCredential> => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = (): Promise<void> => this.auth.signOut();

  doPasswordReset = (email: string): Promise<void> => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string): Promise<void> => (
    this.auth.currentUser
      ? this.auth.currentUser.updatePassword(password)
      : Promise.resolve()
  );

  // User Api
  user = (uid: string): firebase.database.Reference => this.db.ref(`users/${uid}`);

  users = (): firebase.database.Reference => this.db.ref('users');
}

export default Firebase;
