import React from "react";
import TopicListItem from "../mainPage/TopicListItem";
const TopicList = ({topic}) => {
  const topicElement = topic.map(topics => {
    return (
        <TopicListItem
          topic_name={topics.topic_name}
          id={topics.id}
          likes={topics.likes}
          auth={topics.creator_name}
          className="container "
        />
    );
  });
  return <div className="col-md-8 order-md-1 cc_cursor ">
    <div className="my-3 p-3 bg-white rounded shadow-sm">
      <h4 className="border-bottom border-gray pb-2 mb-0">Актуальные темы</h4>
    {topicElement}
    </div>
    </div>;
};
export default TopicList;
