import React, {Component} from 'react';

class ChildComponent extends Component {

    sendMessage=()=>{
        const {websocket, message} = this.props; // websocket instance passed as props to the child component.

        try {
            websocket.send(JSON.stringify({type:'message',message:'hello'})) //send data to the server

        } catch (error) {
            console.log(error) // catch error
        }
    }
    render() {
        return (
            <div>
               <button onClick={this.sendMessage}>send</button>
            </div>
        );
    }
}

export default ChildComponent;