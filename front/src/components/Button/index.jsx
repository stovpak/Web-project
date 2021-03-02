import React from 'react';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const BackButton = () => {
  return (
    <div>
      <button onClick={() => history.back()}>Back</button>
    </div>
  );
};

export default BackButton;
