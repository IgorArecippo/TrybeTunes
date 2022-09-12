import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    isFavorite: false,
  };

  componentDidMount() {
    this.handleFavorites();
  }

  handleFavorites = async () => {
    const { trackId, favoriteSongs } = this.props;
    console.log(favoriteSongs);
    const favorites = await getFavoriteSongs();
    favorites.some((musica) => {
      if (musica.trackId === trackId) {
        return this.setState({
          isFavorite: true,
        });
      }
      return null;
    });
  };

  addMusics = async () => {
    const { musicsObj } = this.props;
    this.setState({
      isLoading: true,
    });
    await addSong(musicsObj);
    this.setState({
      isLoading: false,
    });
  };

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
      isFavorite: true,
    }, () => this.addMusics());
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isFavorite } = this.state;
    return (
      <div>
        {isLoading && <Loading />}
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label
          htmlFor={ trackName }
        >
          Favorita
          <input
            type="checkbox"
            name={ trackName }
            id={ trackName }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.onInputChange }
            checked={ isFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicsObj: PropTypes.shape.isRequired,
  favoriteSongs: PropTypes.object,
}.isRequired;
