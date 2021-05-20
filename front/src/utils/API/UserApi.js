import { httpClient } from '../httpClient';

class UserApi {
  async restorePassword(email) {
    return await httpClient
      .post('user/sign-in/forget-password', {
        email: email,
      })
      .then(res => res.data);
  }

  async passwordKey(key, email, password) {
    return await httpClient
      .post('user/sign-in/restore-password/send-key', { key, password, email })
      .then(res => res.data);
  }

  async updateData(login, firstName, lastName, birth, token) {
    return httpClient
      .post(
        'user/profile/change-data/send',
        {
          login: login,
          firstName: firstName,
          secondName: lastName,
          birthday: birth,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Token: token,
          },
        }
      )
      .then(res => res.data);
  }

  async updateEmail(email, token) {
    return httpClient.post(
      'user/profile/change-email/send',
      { email: email },
      {
        headers: {
          'Content-Type': 'application/json',
          Token: token,
        },
      }
    );
  }

  async updatePassword(password, token) {
    return httpClient
      .post(
        'user/profile/change-pass/send',
        { password: password },
        {
          headers: {
            'Content-Type': 'application/json',
            Token: token,
          },
        }
      )
      .then(res => res.data);
  }
}
const UserAPI = new UserApi();
export default UserAPI;
