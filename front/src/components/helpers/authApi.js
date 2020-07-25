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
  async ChangeData(firstName,lastName,birth,token){
    return httpClient({
      method: "POST",
      url:"user/profile/change-data/send",
      data:{
        firstName:firstName,
        secondName:lastName,
        birthday:birth,
      },
      headers: {
        "Content-Type": "application/json",
        Token: token
      }
    }).then(res=>res.data);
  }

  async ChangeEmail(email, token) {
    return httpClient({
      method: "POST",
      url: "user/profile/change-email/send",
      data: email,
      headers: {
        "Content-Type": "application/json",
        Token: token
      }
    });
  }

  async ChangePassword(password, token) {
    return httpClient
    ({
      method: "POST",
      url: "user/profile/change-pass/send",
      data: password,
      headers: {
        "Content-Type": "application/json",
        Token: token
      }
    });
  }
  async getAllTopics(page, tokenResponse) {
    return await httpClient
        .get(`topics/${page}`, {
          Token: tokenResponse
        })
        .then(res => res.data);
  }
  async createTopic(data, token) {
    return await httpClient
        .post("topics/create-topic/", data, {
          headers: {
            Token: token
          }
        })
        .then(res => res.data);
  }
  async addLikeTopic(idTopic, Token) {
    return await httpClient
        .post(
            "topics/like",
            {
              topicId: idTopic
            },
            {
              headers: {
                Token: Token
              }
            }
        )
        .then(res => res.data);
  }
}
const AuthApi = new authApi();
export default AuthApi;
