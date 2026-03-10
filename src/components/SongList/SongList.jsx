import { useState } from 'react';

const SongList = ({ songs = [], onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (song) => {
    setEditingId(song._id);
    setEditForm({ songName: song.songName, trackNumber: song.trackNumber, notes: song.notes || '' });
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = async (songId) => {
    await onUpdate(songId, editForm);
    setEditingId(null);
  };
  return (
    <div>
      <h2>Songs</h2>
      {songs.length === 0 ? (
        <p>No songs yet. Add your first song!</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song._id}>
              {editingId === song._id ? (
                <>
                  <input name="trackNumber" type="number" value={editForm.trackNumber} onChange={handleEditChange} />
                  <input name="songName" value={editForm.songName} onChange={handleEditChange} />
                  <input name="notes" value={editForm.notes} onChange={handleEditChange} />
                  <button onClick={() => handleEditSubmit(song._id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <strong>Track {song.trackNumber}: {song.songName}</strong>
                  {song.notes && <p>Notes: {song.notes}</p>}
                  <button onClick={() => startEdit(song)}>Edit</button>
                  <button onClick={() => onDelete(song._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongList;