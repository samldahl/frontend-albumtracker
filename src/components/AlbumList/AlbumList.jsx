import { Link } from 'react-router-dom';

const AlbumList = ({ user, albums = [] }) => {
  return (
    <main>
      <h1>My Albums</h1>
      {albums.length === 0 ? (
        <p>No albums yet. Create your first album!</p>
      ) : (
        <div className="album-grid">
          {albums.map((album) => (
            <div key={album._id} className="album-card">
              <Link to={`/albums/${album._id}`}>
                <h3>{album.albumName}</h3>
              </Link>
              <p>Type: {album.type}</p>
              <p>Date: {new Date(album.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AlbumList;