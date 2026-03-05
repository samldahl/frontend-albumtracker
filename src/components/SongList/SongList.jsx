const SongList = ({ songs = [] }) => {
  return (
    <div>
      <h2>Songs</h2>
      {songs.length === 0 ? (
        <p>No songs yet. Add your first song!</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song._id}>
              <strong>Track {song.trackNumber}: {song.songName}</strong>
              {song.notes && <p>Notes: {song.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongList;