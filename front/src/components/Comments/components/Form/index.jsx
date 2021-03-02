import React, { useState } from 'react';

const Form = ({ onSendMessage }) => {
  const [messageText, setMessageText] = useState();

  const handleChange = e => {
    setMessageText(e.target.value);
  };

  return (
    <div>
      <form className="form-group">
        <textarea
          type="text"
          name="text"
          placeholder="Оставьте свой комментарий..."
          className="form-control"
          onChange={handleChange}
        />
        <button
          className="btn btn-warning mt-3"
          type="button"
          onClick={() => {
            onSendMessage(messageText);
          }}
        >
          Оставить комментарий
        </button>
      </form>
    </div>
  );
};

export default Form;
