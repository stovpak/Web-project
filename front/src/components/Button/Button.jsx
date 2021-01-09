import React, {Component} from 'react';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

class Button extends Component {
    render() {
        return (
            <div>
                <button  onClick={()=>history.back()}>Back</button>
            </div>
        );
    }
}

export default Button;