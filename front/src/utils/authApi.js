import { httpClient } from './httpClient';
import { getJwt } from './cookies';

class TopicApi {
  async getAllTopics(page, tokenResponse) {
    return await httpClient
      .get(`topics/${page}`, {
        'Content-Type': 'application/json',
        Token: tokenResponse,
      })
      .then(res => res.data);
  }

  async createTopic(data, token) {
    return await httpClient
      .post('topics/create-topic/', data, {
        headers: {
          'Content-Type': 'application/json',
          Token: token,
        },
      })
      .then(res => res.data);
  }

  async getUserTopics(token) {
    return await httpClient
      .post(
        'topics/my-topics',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Token: token,
          },
        }
      )
      .then(res => res.data);
  }
  async deleteTopic(id) {
    return httpClient.delete('topics/delete-topic', {
      body: { topicId: id, type: 'Topic' },
      headers: {
        'Content-Type': 'application/json',
        Token: getJwt(),
      },
    });
  }
}
const TopicAPI = new TopicApi();
export default TopicAPI;
