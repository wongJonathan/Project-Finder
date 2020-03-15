const fireBaseMock = jest.fn().mockImplementation(() => ({
  __esModule: true,
  doCreateUserWithEmailAndPassword: jest.fn(),
  doSignInWithEmailAndPassword: jest.fn(),
  doSignOut: jest.fn(),
  doPasswordReset: jest.fn(),
  doPasswordUpdate: jest.fn(),
  user: jest.fn(),
  users: jest.fn(),
}));
export default fireBaseMock;
