import { httpClient } from "./httpClient";
import {getJwt} from "./getJwt";

class authApi {
  async signIn(AuthRequest) {
    return await httpClient
      .post("user/sign-in", AuthRequest)
      .then((res) => res.data);
  }

  async signUp(AuthRequest) {
    return await httpClient
      .post("user/sign-up", AuthRequest)
      .then((res) => res.data);
  }

  async restorePassword(email) {
    return await httpClient
      .post("user/sign-in/forget-password", {
        email: email,
      })
      .then((res) => res.data);
  }
  async passwordKey(key, email, password) {
    return await httpClient
      .post("user/sign-in/restore-password/send-key", { key, password, email })
      .then((res) => res.data);
  }

  async updateData(firstName, lastName, birth, token) {
    return httpClient
      .post(
        "user/profile/change-data/send",
        { firstName: firstName, secondName: lastName, birthday: birth },
        {
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
        }
      )
      .then((res) => res.data);
  }

  async updateEmail(email, token) {
    return httpClient.post(
      "user/profile/change-email/send",
      { email: email },
      {
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      }
    );
  }

  async updatePassword(password, token) {
    return httpClient
      .post(
        "user/profile/change-pass/send",
        { password: password },
        {
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
        }
      )
      .then((res) => res.data);
  }
  async getAllTopics(page, tokenResponse) {
    return await httpClient
      .get(`topics/${page}`, {
        "Content-Type": "application/json",
        Token: tokenResponse,
      })
      .then((res) => res.data);
  }

  async createTopic(data, token) {
    return await httpClient
      .post("topics/create-topic/", data, {
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      })
      .then((res) => res.data);
  }

  async getUserTopics(token) {
    return await httpClient
      .post(
        "topics/my-topics",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
        }
      )
      .then((res) => res.data);
  }
  async deleteTopic(id ){
      return await httpClient.delete('topics/delete-topic',
          {
              body:{topicId:id, type:'Topic'},
              headers: {
                  "Content-Type": "application/json",
                  Token: getJwt(),
              },
          })
  }

  async addLikeTopic(idTopic, Token) {
    return await httpClient
      .post(
        "topics/like",
        {
          topicId: idTopic,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Token: Token,
          },
        }
      )
      .then((res) => res.data);
  }
}
const AuthApi = new authApi();
export default AuthApi;
