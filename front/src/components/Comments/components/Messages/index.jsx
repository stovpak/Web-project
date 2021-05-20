import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/user/selector';
import avatarLabel from 'assets/images/avatar.svg';
import img from '../../../../assets/images/edit.svg';
import deleteIcon from '../../../../assets/images/delete.svg';

const Messages = ({ comments, editComments, deleteComments }) => {
  const user = useSelector(userSelector);
  const [isShow, setIsShow] = useState();
  const [newComments, setNewComments] = useState(comments.text);

  const handleSaveMessage = (id, newMessage) => {
    setIsShow(false);
    editComments(id, newMessage);
  };

  return (
    <div className="media text-muted pt-3">
      <img
        src={avatarLabel}
        alt=""
        className="bd-placeholder-img mr-2 rounded"
      />
      <div className="pb-3 mb-0  border-bottom border-gray pb-2 mb-0 w-100 cc_cursor">
        <strong className="d-block text-body cc_cursor blog-post-title text-monospace">
          @{comments.author_name}
        </strong>
        {isShow ? (
          <input
            type="text"
            name="message"
            onChange={e => setNewComments(e.target.value)}
          />
        ) : (
          newComments
        )}
        <small className="text-muted float-right">
          {comments.author_name === user.username && (
            <>
              {isShow ? (
                <button
                  type="button"
                  className="btn btn-lin "
                  onClick={() => handleSaveMessage(comments.id, newComments)}
                >
                  Сохранить
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-lin "
                  onClick={setIsShow}
                >
                  <span className="mobile-hide">Редактировать</span>
                  <img src={img} alt="edit" className="desktop-hide" />
                </button>
              )}
              <button
                type="button"
                className="btn btn-lin"
                onClick={() => deleteComments(comments.id)}
              >
                <span className="mobile-hide">Удалить</span>
                <img src={deleteIcon} alt="delete" className="desktop-hide" />
              </button>
            </>
          )}
        </small>
      </div>
    </div>
  );
};

export default Messages;
