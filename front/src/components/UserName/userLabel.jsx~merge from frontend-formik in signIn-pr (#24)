import React, {Component} from 'react';
import Cookies from "universal-cookie";
class UserLabel extends Component {
    
    render() {
        let cookies = new Cookies();
        let getUser = this.props.name;
        let user;
        if(getUser!==null || getUser!==undefined){
            user=
                <div className="input-group mb-3">
                    <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <p
                            name={this.props.name}
                            className="form-control"
                        />
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="http://localhost:3000/profile">
                            Профиль
                        </a>
                        <div role="separator" className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={this.onClick}>
                            Выход
                        </a>
                    </div>
                </div>
            }
        else {
               user= <button className="btn btn-warning">Войти </button>
        }
        return(
            <div>{user}</div>
        
        )}
    
}

export default UserLabel;