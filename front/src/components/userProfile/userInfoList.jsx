import React, {Component} from 'react';

class UserInfoList extends Component {

    render() {
        const {userData}=this.props
        return (
            <div>
                <li className="list-group-item" name={userData.name} key={userData.id}>
                    <span className="size-label">{userData.name.value}</span>
                    <button
                        className={" float-right btn btn-link"}
                        onClick={this.onChange}
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                    >
                        Изменить
                    </button>
                </li>
            </div>
        );
    }
}

export default UserInfoList;