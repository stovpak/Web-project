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
  }, [clearLikes]);

  return (
    <div className="col-md-8 order-md-1 cc_cursor ">
      <div className="my-3 p-3 bg-white rounded shadow-sm">
        <h4 className="border-bottom border-gray pb-2 mb-0 d-flex align-items-center justify-content-between">
          <span>Актуальные темы</span>
          <div className="justify-content-end">
            <button
              onClick={() => topTopics('weekly-top')}
              className="btn btn-warning mr-5"
            >
              Лучшее за неделю
            </button>
            <button
              onClick={() => topTopics('monthly-top')}
              className="btn btn-warning"
            >
              Лучшее за месяц
            </button>
          </div>
        </h4>
        {topic ? (
          topic.map(({ topic_name, id, likes, creator_name }) => {
            return (
              <TopicListItem
                key={id}
                topic_name={topic_name}
                id={id}
                isLikes={likeCount
                  .map(({ id }) => id)
                  .find(item => item === id)}
                likes={likes}
                auth={creator_name}
                className="container"
              />
            );
          })
        ) : (
          <h2 className="mb-5">Ничего не найдено</h2>
        )}
      </div>
    </div>
  );
};

export default connect(state => ({ likeCount: state.userLikes.likes }), {
  clearLikes,
})(Topics);
