import React, { Component } from "react";
import SearchIcon from "../SearchIcon.png";
import "./my.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = (event) => {
    event.preventDefault();
    const { query } = this.state;
    const { onSearch } = this.props;
    onSearch(query);
  };

  render() {
    const { query } = this.state;

    return (
      <div className="search-bar">
        <form onSubmit={this.handleSearch}>
          <input
            type="text"
            value={query}
            onChange={this.handleChange}
            placeholder="Search for images..."
            id="input-proper"
          />
          <button type="submit" id="but-prop">
            <img src={SearchIcon} alt="Search" id="icon-prop" />
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
