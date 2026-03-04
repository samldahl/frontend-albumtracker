const AlbumList = ({ user, albums = [] }) => {
  return (
    <main>
      <h1>My Albums</h1>
      {albums.length === 0 ? (
        <p>No albums yet. Create your first album!</p>
      ) : (
        albums.map((album) => (
          <p key={album._id}>{album.albumName}</p>
        ))
      )}
    </main>
  );
};

export default AlbumList;