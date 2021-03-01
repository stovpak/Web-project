import { httpClient } from '../httpClient';

class AuthApi {
  async signIn(AuthRequest) {
    return await httpClient
      .post('user/sign-in', AuthRequest)
      .then(res => res.data);
  }

  async signUp(AuthRequest) {
    return await httpClient
      .post('user/sign-up', AuthRequest)
      .then(res => res.data);
  }
}

const AthorApi = new AuthApi();
export default AthorApi;
