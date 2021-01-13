import React, { Component } from "react";
import { redirectToUrl } from "../helpers/baseAPI";
import { removeCookie } from "../helpers/userService";
import { connect } from "react-redux";
import { clearLikes } from "../../redux/reducers/userLikes";
const UserLabel = ({ username, clearLikes }) => {

  const onLogOut = () => {
    removeCookie("username");
    removeCookie("sessionToken");
    clearLikes();
    redirectToUrl("user/sign-in");
  };

  return (
    <div className="input-group mb-3 ">
      <div className="dropdown open w-50">
        <button
          className="btn btn-secondary dropdown-toggle "
          type="button"
          id="dropdownMenu3"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {username}
        </button>
        <div className="dropdown-menu" x-placement="right-start">
          <a className="dropdown-item" href="/user/profile">
            Профиль
          </a>
          <a className="dropdown-item" href="/user/my-topics">
            Мои темы
          </a>
          <div role="separator" className="dropdown-divider"/>
          <a className="dropdown-item" href="/#" onClick={onLogOut}>
            Выход
          </a>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { clearLikes })(UserLabel);
