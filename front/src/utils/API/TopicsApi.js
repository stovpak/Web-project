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
    return await httpTopics.post('create-topic', data, {
      headers,
    });
  }

  async getUserTopics() {
    return await httpTopics
      .post(
        'my-topics',
        {},
        {
          headers,
        }
      )
      .then(res => res.data);
  }
  async deleteTopic(id) {
    return httpTopics.delete('delete-topic', {
      data: { topicId: id },
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
