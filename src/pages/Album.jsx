import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  state = {
    artistName: '',
    albumName: '',
    musics: [],
    isLoading: true,
    musicsObj: {},
  };

  async componentDidMount() {
    this.fetchMusics();
    this.setState({
      isLoading: true,
    });
    this.setState({
      isLoading: false,
    });
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    const musicasSlice = musicas.slice(1);
    this.setState({
      artistName: musicas[0].artistName,
      albumName: musicas[0].collectionName,
      musics: musicasSlice,
      isLoading: false,
      musicsObj: musicas,
    });
  };

  render() {
    const { artistName,
      albumName, musics, isLoading, musicsObj } = this.state;
    return (
      <div>
        <div>
          <div data-testid="page-album">
            <Header />
          </div>
          <h1 data-testid="album-name">{ albumName }</h1>
          <h2 data-testid="artist-name">{ artistName }</h2>
        </div>
        <div>
          {isLoading && <Loading />}
          {
            musics.map((song) => (
              <MusicCard
                key={ song.trackId }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                musicsObj={ musicsObj }
                trackId={ song.trackId }
                // favoriteSongs={ favoriteSongs }
              />
            ))
          }
        </div>
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
