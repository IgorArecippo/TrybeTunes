import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isButtonDisabled: true,
    artistName: '',
  };

  validaBotao = () => {
    const { artistName } = this.state;
    const dois = 2;

    if (artistName.length >= dois) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.validaBotao());
  };

  render() {
    const { isButtonDisabled, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          type="text"
          value={ artistName }
          name="artistName"
          onChange={ this.onInputChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isButtonDisabled }
          onChange={ this.onInputChange }
        >
          Buscar
        </button>
      </div>
    );
  }
}

export default Search;
