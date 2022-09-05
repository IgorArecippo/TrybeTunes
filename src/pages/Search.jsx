import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    isButtonDisabled: true,
    artistName: '',
    albums: [],
    loading: false,
    didSearch: false,
    artistName2: '',
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

  searchButton = async () => {
    const { artistName } = this.state;
    this.setState({
      loading: true,
      artistName2: artistName,
    });
    const albumsList = await searchAlbumsAPI(artistName);
    this.setState({
      artistName: '',
      loading: false,
      albums: albumsList,
      didSearch: true,
    });
  };

  render() {
    const {
      isButtonDisabled,
      artistName, albums, loading, didSearch, artistName2 } = this.state;
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
          onClick={ this.searchButton }
        >
          Buscar
        </button>
        <div>
          {loading && <Loading />}
          {
            (albums.length === 0 && didSearch ? (
              <h2>Nenhum álbum foi encontrado</h2>
            ) : (
              <div>
                <p>
                  Resultado de álbuns de:
                  {' '}
                  { artistName2 }
                </p>
                {
                  albums.map((cd) => (
                    <Link
                      to={ `/album/${cd.collectionId}` }
                      key={ cd.artworkUrl100 }
                      data-testid={ `link-to-album-${cd.collectionId}` }
                    >
                      { cd.collectionName }
                    </Link>
                  ))
                }
              </div>
            )
            )
          }
        </div>
      </div>
    );
  }
}

export default Search;
