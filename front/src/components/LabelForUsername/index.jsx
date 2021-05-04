import React, { useState } from 'react';

import { connect, useDispatch } from 'react-redux';
import { clearLikes } from 'redux/reducers/reducers';
import { logOut } from 'redux/user/user';

import { redirectToUrl } from 'utils/baseAPI';
import { getJwt, getUsernameFromCookies, removeCookie } from 'utils/cookies';

import { Button, MenuItem, Menu } from '@material-ui/core';
import {
  LabelStyle,
  MenuItemStyle,
} from 'components/Material UI/materialStyle';

const LabelForUsername = ({ clearLikes, logOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogout, setIsLogout] = useState(false);

  const dispatch = useDispatch();

  const onLogOut = () => {
    removeCookie('username');
    removeCookie('sessionToken');
    setIsLogout(false);
    dispatch(clearLikes());
    dispatch(logOut());
  };

  const handleClick = event => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const onClickPage = () => {
    redirectToUrl('user/sign-in');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (getJwt()) {
    return (
      <div className=" ">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={LabelStyle}
        >
          {getUsernameFromCookies()}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => redirectToUrl('user/profile')}
            style={MenuItemStyle}
          >
            Профиль
          </MenuItem>
          <MenuItem
            onClick={() => redirectToUrl('topics/my-topics')}
            style={MenuItemStyle}
          >
            Мои темы
          </MenuItem>
          <MenuItem onClick={onLogOut} style={MenuItemStyle}>
            Выйти
          </MenuItem>
        </Menu>
      </div>
    );
  } else {
    dispatch(logOut());

    return (
      <button
        className="btn btn-warning form-control"
        type="button"
        onClick={onClickPage}
      >
        Войти
      </button>
    );
  }
};

export default connect(
  state => ({ isAuth: state.user.isAuth, username: state.user.username }),
  {
    clearLikes,
    logOut,
  }
)(LabelForUsername);
