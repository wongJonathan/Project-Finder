import { UserInfo } from 'firebase';

const createUserInfo = (data?: Partial<UserInfo>): UserInfo => ({
  ...data,
  displayName: 'testUser',
  email: 'test@test.com',
  phoneNumber: null,
  photoURL: null,
  providerId: 'testProvider',
  uid: '1',
});

export default createUserInfo;
