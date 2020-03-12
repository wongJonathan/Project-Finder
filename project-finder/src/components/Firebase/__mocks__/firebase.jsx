const fireBaseMock = jest.fn().mockImplementation(() => {
  return {
    __esModule: true,
    doCreateUserWithEmailAndPassword: jest.fn(),
    doSignInWithEmailAndPassword: jest.fn(),
    doSignOut: jest.fn(),
    doPasswordReset: jest.fn(),
    doPasswordUpdate: jest.fn(),
  };
});
export default fireBaseMock;
