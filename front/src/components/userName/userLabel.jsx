import React, {Component, useState} from "react";
import { redirectToUrl } from "../helpers/baseAPI";
import { removeCookie } from "../helpers/userService";
import { connect } from "react-redux";
import { clearLikes } from "../../redux/reducers/userLikes";
import { Button, MenuItem, Menu } from "@material-ui/core";
import { LabelStyle, MenuItemStyle } from "../Material UI/materialStyle";
const UserLabel = ({ username, clearLikes }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogout, setIsLogout] = useState(false);

  const onLogOut = () => {
    removeCookie("username");
    removeCookie("sessionToken");
    clearLikes();
    setIsLogout(true)
  };
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <MenuItem onClick={()=>redirectToUrl( "user/profile")} style={MenuItemStyle}>
            Профиль
          </MenuItem>
          <MenuItem onClick={()=>redirectToUrl( "user/my-topics")} style={MenuItemStyle}>
            Мои темы
          </MenuItem>
          <MenuItem onClick={ onLogOut } style={MenuItemStyle}>
            Выйти
          </MenuItem>
        </Menu>
      </div>
  );
};

export default connect(null, { clearLikes })(UserLabel);