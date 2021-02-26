import React, { Component } from 'react';

class SearchPanel extends Component {
  state = {
    text: '',
  };
  onChange = e => {
    const { onSearchPanel = () => {} } = this.props;
    this.setState({ text: e.target.value });
    onSearchPanel(e.target.value);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          className="form-control search-input mr-sm-2"
          value={this.state.text}
          onChange={this.onChange}
          placeholder="Введите ключевое слово, для поиска"
        />
      </div>
    );
  }
}

export default SearchPanel;
