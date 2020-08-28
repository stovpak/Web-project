
import React, { Component } from "react";

export default class MessageList extends Component {
  render() {
    let messages = this.props.content;
    const messageItem = messages.map((messages, i) => {
        return (
          <div  className={"w-100"}>
            <div className={"shadow-sm p-3 mb-5 bg-light rounded w-100"} key={i}>
              <h5 >{messages.author_name}</h5>
              <p>message:{messages.text}</p>
            </div>
          </div>
        );
      })
    return <div>{messageItem}</div>;

  }
}

