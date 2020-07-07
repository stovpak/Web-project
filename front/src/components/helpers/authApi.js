import { AuthRequest } from "./userService";
import { TokenResponse } from "./getJwt";
import { httpClient } from "./httpClient";

class authApi {
  async signIn(AuthRequest) {
    return await httpClient
      .post("user/sign-in", AuthRequest)
      .then(res => res.data);
  }

  async SignUp(AuthRequest) {
    return await httpClient
      .post("user/sign-up", AuthRequest)
      .then(res => res.data);
  }
  async ChangeEmail(AuthRequest, Token) {
    return await httpClient
      .post("user/profile/change-email/send/", {AuthRequest}, Token)
      .then(res => res.data);
  }
  async ChangePassword(data, Token) {
    return await httpClient
      .post("user/profile/change-pass/send", data, Token)
      .then(res => res.data);
  }
  async RestorePassword() {}
  async getAllTopics(page, TokenResponse) {
    return await httpClient
      .get(`topics/${page}`, { Token: TokenResponse })
      .then(res => res.data);
  }
  async createTopic(data, Token) {
    return await httpClient
      .post("topics/create-topic/", data, { headers: { Token: Token } })
      .then(res => res.data);
  }
  async addLikeTopic(idTopic, Token) {
    return await httpClient
      .post("topics/like", {topicId:idTopic}, { headers: { Token: Token } })
      .then(res => res.data);
  }
}
const AuthApi = new authApi();
export default AuthApi;