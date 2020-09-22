import React from "react";

const TopicItem = ({auth, likes, topic_name}) => {
  return (
          <div className="card text-white bg-dark mb-3">
              <div className="card-header">
                  Автор : {auth}
                  <p className="btn-likes float-right">
                      Понравилось : {likes}
                  </p>{" "}
              </div>
              <div className="card-body">
                  <h4 className="card-title">{topic_name}</h4>
              </div>
          </div>
      )
};

export default TopicItem;