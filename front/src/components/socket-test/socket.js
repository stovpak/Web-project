import React, {useState, useEffect, Component} from "react";
import ChildComponent from "./childComponent";
export default class Socket extends Component{
    constructor(props) {
        super(props);

        this.state = {
            ws: null,
            message:"hello"
        };
    }
    componentDidMount() {
        this.connect();
    }
    timeout = 250;

    connect = () => {
        console.log("connect")
        const ws = new WebSocket("ws://localhost:8080/ws");
        let connectInterval;
        ws.onmessage = function(message){
            const  event = JSON.parse(message.data)
            console.log(event);
        }
        ws.onopen = () => {

            this.setState({ ws: ws });
            this.timeout = 250;
            clearTimeout(connectInterval);
        };
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (this.timeout + this.timeout) / 1000
                )} second.`,
                e.reason
            );

            this.timeout = this.timeout + this.timeout;
            connectInterval = setTimeout(this.check, Math.min(10000, this.timeout));
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    };

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    check = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState == WebSocket.CLOSED) this.connect();
    };

    render() {
        return <ChildComponent websocket={this.state.ws} message={this.state.message}/>;
    }
}

