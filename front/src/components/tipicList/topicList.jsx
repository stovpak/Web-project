import React from "react";
import TopicListItem from "../Main-Page/TopicListItem";
/*let styleList = "table-hover table-dark ";*/
const TopicList = props => {

  const topicElement = props.topic.map(topic => {
    return (
        <TopicListItem
          topic_name={topic.topic_name}
          id={topic.id}
          likes={topic.likes}
          auth={topic.creator_name}
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
{
  /*
<div className="media-body card container mt-4">

    <div className="row">
        <h2 className="mt-0 card-header tx-al col" key={id}>
            {this.props.topic_name}
            <p className="creator-name float-left ">{auth}</p>

            <p className={`float-right count-likes ${heartIsLike}`}>
                {likes + countLikes}
            </p>
            <button
                className={`float-right btn-likes ${heartIsLike}`}
                onClick={e => this.addLike(e, id)}
            >
                <svg
                    className=" bi-heart float-right"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenod"
                        d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    />
                </svg>
            </button>
        </h2>
    </div>
</div>*/
}
