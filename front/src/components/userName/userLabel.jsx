import React, { useState } from 'react';
import { redirectToUrl } from 'utils/baseAPI';
import { removeCookie } from 'utils/cookies';
import { connect } from 'react-redux';
import { clearLikes } from 'redux/reducers/reducers';
import { Button, MenuItem, Menu } from '@material-ui/core';
import {
  LabelStyle,
  MenuItemStyle,
} from 'components/Material UI/materialStyle';
import { logOut } from 'redux/user/user';

const UserLabel = ({ username, isAuth, clearLikes, logOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogout, setIsLogout] = useState(false);

  const onLogOut = () => {
    removeCookie('username');
    removeCookie('sessionToken');
    setIsLogout(false);
    clearLikes();
    logOut();
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

  if (isAuth) {
    console.log('dadad');
    return (
      <div className=" ">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={LabelStyle}
        >
          {username}
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
            onClick={() => redirectToUrl('user/my-topics')}
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
)(UserLabel);
