import React, { useState } from 'react';
import './styled.css';
import { redirectToUrl } from 'utils/baseAPI';
import { useSelector } from 'react-redux';
import LabelForUsername from 'components/LabelForUsername';
import UnAuthorized from 'components/AlertWindow/UnAuthorized';
import { LabelStyle, MenuItemStyle } from '../Material UI/materialStyle';
import { getUsernameFromCookies } from '../../utils/cookies';

const NavBar = () => {
  const { isAuth } = useSelector(state => state.user);
  const [isOpenModal, setIsOpenModal] = useState(null);

  const addTopic = () => {
    if (!isAuth) {
      setIsOpenModal(true);
    } else {
      redirectToUrl('topics/create-topic');
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      {isOpenModal && <UnAuthorized open={true} handleClose={handleClose} />}
      <nav className="navbar navbar-expand-md bg-dark navbar-dark  d-flex justify-content-end">
        <ul className="container ">
          {' '}
          <a className="navbar-brand " href="#">
            AvtoForum
          </a>
          {isAuth ? (
            <button
              className="navbar-toggler desktop-hide navbar-label-username"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
              style={LabelStyle}
            >
              {getUsernameFromCookies()}
            </button>
          ) : (
            <ul className="navbar-align m-0 desktop-hide">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <LabelForUsername />
                </a>
              </li>
            </ul>
          )}
          <button
            className="navbar-toggler mobile-hide"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav d-flex align-items-center pr-5">
              <li className="nav-item active">
                <a className="nav-link" href="/topics">
                  Главная
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <button
                    name="addTopic"
                    type="button"
                    className="ml-auto btn btn-warning m-50 nav-button"
                    onClick={addTopic}
                  >
                    Добавить тему
                  </button>
                </a>
              </li>
              <li className="nav-item active desktop-hide">
                <a
                  className="nav-link"
                  onClick={() => redirectToUrl('user/profile')}
                >
                  Профиль
                </a>
              </li>
              <li className="nav-item active desktop-hide">
                <a
                  className="nav-link"
                  onClick={() => redirectToUrl('topics/my-topics')}
                >
                  Мои темы
                </a>
              </li>
              <li
                style={MenuItemStyle}
                className="nav-link active desktop-hide"
              >
                <a
                  className="nav-link"
                  onClick={() => redirectToUrl('topics/my-topics')}
                >
                  Выйти
                </a>
              </li>
            </ul>
            <ul className="navbar-nav navbar-align mobile-hide">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <LabelForUsername />
                </a>
              </li>
            </ul>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
