import React, { useState } from 'react';
import { getJwt } from '../../../../utils/cookies';
import { Alert } from '../../../AlertWindow/Alert';

const Form = ({ onSendMessage }) => {
  const [messageText, setMessageText] = useState();

  const handleChange = e => {
    setMessageText(e.target.value);
  };

  return (
    <div className="mt-4 mb-4">
      {!getJwt() ? (
        <Alert severity="warning">
          <p className="h6">
            Комментарии могут оставлять только зарегистрированнные пользователи
          </p>
        </Alert>
      ) : (
        <form className="form-group">
          <textarea
            type="text"
            name="text"
            value={messageText}
            placeholder="Оставьте свой комментарий..."
            className="form-control"
            onChange={handleChange}
          />
          <button
            className="btn btn-warning mt-3"
            type="button"
            onClick={() => {
              setMessageText(' ');
              onSendMessage(messageText);
            }}
          >
            Оставить комментарий
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
