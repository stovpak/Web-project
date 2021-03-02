import { httpTopics } from '../httpClient';
import { getJwt } from '../cookies';

const headers = {
  'Content-Type': 'application/json',
  Token: getJwt(),
};

class TopicApi {
  async getAllTopics(page) {
    return await httpTopics.get(`${page}`, headers).then(res => res.data);
  }

  async createTopic(data) {
    return await httpTopics
      .post('create-topic', data, {
        headers,
      })
      .then(res => console.log(res.data));
  }

  async getUserTopics() {
    return await httpTopics
      .post(
        'my-CreateTopic',
        {},
        {
          headers,
        }
      )
      .then(res => res.data);
  }
  async deleteTopic(id) {
    return httpTopics.delete('delete-topic', {
      body: { topicId: id, type: 'Topic' },
      headers: {
        'Content-Type': 'application/json',
        Token: getJwt(),
      },
    });
  }
  async getTopTopics(type) {
    return httpTopics.get(`top/${type}`).then(res => res.data);
  }
}

const TopicAPI = new TopicApi();
export default TopicAPI;
