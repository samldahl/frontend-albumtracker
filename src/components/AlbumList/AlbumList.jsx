const AlbumList = ({ user }) => {
  return (
    <main>
      <h1>My Albums</h1>
      {user ? (
        
        <p>Albums loading...</p>
      ) : (
        <p>Please sign in to view albums.</p>
      )}
    </main>
  );
};

export default AlbumList;