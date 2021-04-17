import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <nav className="search-bar">
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </nav>
    );
  }
}

export default SearchBar;
