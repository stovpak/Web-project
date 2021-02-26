import React, { useState } from 'react';
import './navBar.css';
import { redirectToUrl } from 'utils/baseAPI';
import { useSelector } from 'react-redux';

import UserLabel from 'components/UserName/userLabel';
import UnAuthorized from 'components/AlertWindow/UnAuthorized';

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
        <a className="navbar-brand " href="#">
          AvtoForum
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ">
            <li className="nav-item ">
              <a className="nav-link" href="/topics">
                Главная <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Обсуждения
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <form className="form-inline form-group my-2 my-lg-0 float-right">
                  <button
                    name="addTopic"
                    type="button"
                    className="ml-auto btn btn-warning m-50"
                    onClick={addTopic}
                  >
                    Добавить тему
                  </button>
                </form>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav navbar-align w-25">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <UserLabel />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
