import { Link } from 'react-router-dom';

const SongList = ({ user, albums, songs = [] }) => {
  return (
    <main>
      <h1>Songs on {album.albumName}</h1>
      {albums.length === 0 ? (
        <p>No songs yet. Add your first song!</p>
      ) : (
        songs.map((song) => (
          <div key={song._id}>
            <Link to={`/albums/${song._id}`}>
              <h3>{song.songName}</h3>
            </Link>
            <p>Type: {song.trackNumber}</p>
            <p>Date: {song.notes}</p>
          </div>
        ))
      )}
    </main>
  );
};

export default SongList;