import React, { Component } from "react";
export default class Messages extends Component {
  render() {
    let messages = this.props.content;
    let showDate, showTime;
    const messageItem = messages.map(({ author_name, date, text, id }) => {
      if (date !== null) {
        let data = new Date(date);
        showDate =
          data.getDate() +
          " " +
          data.toLocaleString("ru", { month: "long" }) +
          " " +
          data.getFullYear();
        showTime = data.getHours() + ":" + data.getMinutes();
      }
      return (
        <div className="media text-muted pt-3  " key={id}>
          <svg
            className="bd-placeholder-img mr-2 rounded"
            width="32"
            height="32"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
            aria-label="Placeholder: 32x32"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#ec971f"></rect>
          </svg>
          <p className="pb-3 mb-0  border-bottom border-gray pb-2 mb-0 w-100 cc_cursor">
            <strong className="d-block text-body cc_cursor blog-post-title text-monospace">
              @{author_name}
            </strong>
            {text}
            <small className="text-muted float-right">
              {showTime} {showDate}
            </small>
          </p>
        </div>
      );
    });
    return <div>{messageItem}</div>;
  }
}