import React from "react";
import { userService } from "../helpers/user.servise";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  componentDidMount() {
    userService.getAll().then(users => this.setState({ users }));
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <ul className="nav nav-tabs  bg-dark text-warning  ">
          <li className="nav-item text-warning">
            <a className="nav-link text-warning" href="#">
              Главная
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-warning" href="#">
              Темы
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-warning" href="#">
              Видео
            </a>
          </li>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2 "
              type="text"
              placeholder="Поиск"
              aria-label="Search"
            />
            <button
              className="btn btn-warning my-2 my-sm-0"
              text-warning
              type="submit"
            >
              Search
            </button>
          </form>
        </ul>
        <h1>Главная</h1>
        <p>
          Вы вошки как :
          {users && (
            <ul>
              {users.map(user => (
                <li key={user.id}>
                  {user.firstName} {user.lastName}
                </li>
              ))}
            </ul>
          )}
        </p>
      </div>
    );
  }
}

export default AdminPage ;