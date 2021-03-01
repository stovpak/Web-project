import React, { Component } from 'react';
import img from 'assets/images/ErrorMan.png';
import img2 from 'assets/images/hz3.png';

class Index extends Component {
  render() {
    return (
      <div className="container text-center cnt ">
        <div className="alert alert-danger ">
          <h1 className="text-center">УПС!</h1>
          <p className="blockquote">Что-то пошло не так</p>
          <p>Скоро мы устраним проблему!</p>
          <div className="error">
            <a href="/#">
              <img
                src={img}
                alt="ohNO"
                className="imageError"
                onMouseOver={e => {
                  e.currentTarget.src = img2;
                }}
                onMouseOut={e => {
                  e.currentTarget.src = img;
                }}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
