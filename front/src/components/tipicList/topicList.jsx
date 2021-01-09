import React, { useEffect } from "react";
import TopicListItem from "../mainPage/TopicListItem";
import { connect } from "react-redux";
import { getJwt } from "../helpers/getJwt";
import { clearLikes } from "../../redux/reducers/userLikes";
const TopicList = ({ topic, likeCount, clearLikes }) => {
  useEffect(() => {
    if (!getJwt()) {
      clearLikes();
    }
  }, []);

  const topicElement = topic.map(
    ({ topic_name, id, likes, creator_name }, key) => {
      return (
        <TopicListItem
          key={key}
          topic_name={topic_name}
          id={id}
          isLikes={likeCount
            .map(({ topic_id }) => topic_id)
            .find((i) => i === id)}
          likes={likes}
          auth={creator_name}
          className="container "
        />
      );
    }
  );
  return (
    <div className="col-md-8 order-md-1 cc_cursor ">
      <div className="my-3 p-3 bg-white rounded shadow-sm">
        <h4 className="border-bottom border-gray pb-2 mb-0">Актуальные темы</h4>
        {topicElement}
      </div>
    </div>
  );
};

export default connect((state) => ({ likeCount: state.userLikes.likes }), {
  clearLikes,
})(TopicList);
