import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

export default class Album extends React.Component {
  state = {
    artistName: '',
    albumName: '',
    musics: [],
  };

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    musicas.slice();
    console.log(musicas);
    this.setState({
      artistName: musicas[0].artistName,
      albumName: musicas[0].collectionName,
      musics: musicas,
    });
  };

  render() {
    const { artistName, albumName, songs } = this.state;
    return (
      <div>
        <div data-testid="page-album">
          <Header />
        </div>
        <h1 data-testid="album-name">{ albumName }</h1>
        <h2 data-testid="artist-name">{ artistName }</h2>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
