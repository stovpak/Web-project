
import React, {Component} from 'react';
import ChildComponent from "./childComponent";

export default class MessageList extends Component{
    render(){
        let messages = this.props.message;
        const messageItem=messages.map((messages, i)=>{
        return(
            <div>
                <ChildComponent key={i} message={messages.message} user={messages.user}/>
            </div>
        )
    })
        return(
        <div>
            {messageItem}
        </div>
    )
    }



}

