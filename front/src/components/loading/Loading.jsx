import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div>

          <div className="text-center">
              <h3>Загрузка...</h3>
              <div className="spinner-grow text-dark" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
          </div>
        </div>
    );
  }
}

export default Loading;