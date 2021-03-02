import React, { useEffect } from 'react';
import { clearLikes } from 'redux/reducers/reducers';
import TopicListItem from 'components/HomePage/components/TopicItem';
import { connect, useSelector } from 'react-redux';
import { getJwt } from 'utils/cookies';

const Topics = ({ topic, clearLikes, topTopics }) => {
  const likeCount = useSelector(state => state.userLikes.likes);

  useEffect(() => {
    if (!getJwt()) {
      clearLikes();
    }
  }, []);

  return (
    <div className="col-md-8 order-md-1 cc_cursor ">
      <div className="my-3 p-3 bg-white rounded shadow-sm">
        <h4 className="border-bottom border-gray pb-2 mb-0">
          Актуальные темы
          <div>
            <button onClick={() => topTopics('weekly-top')}>
              Лучшее за неделю
            </button>
            <button onClick={() => topTopics('monthly-top')}>
              Лучшее за месяц
            </button>
          </div>
        </h4>
        {topic.map(({ topic_name, id, likes, creator_name }, key) => {
          return (
            <TopicListItem
              key={key}
              topic_name={topic_name}
              id={id}
              isLikes={likeCount.map(({ id }) => id).find(item => item === id)}
              likes={likes}
              auth={creator_name}
              className="container"
            />
          );
        })}
      </div>
    </div>
  );
};

export default connect(state => ({ likeCount: state.userLikes.likes }), {
  clearLikes,
})(Topics);
