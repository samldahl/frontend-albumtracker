import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as albumService from '../../services/albumService';
import * as songService from '../../services/songService';
import SongList from '../SongList/SongList';


const ViewAlbum = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchAlbumAndSongs = async () => {
      try {
        setLoading(true);
        const albumData = await albumService.show(albumId);
        setAlbum(albumData);
        
        const songsData = await songService.getBySongId(albumId);
        setSongs(songsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumAndSongs();
  }, [albumId]);

  const handleDeleteSong = async (songId) => {
    await songService.deleteSong(albumId, songId);
    setSongs((prev) => prev.filter((s) => s._id !== songId));
  };

  const handleUpdateSong = async (songId, updatedData) => {
    const updated = await songService.updateSong(albumId, songId, updatedData);
    setSongs((prev) => prev.map((s) => (s._id === songId ? updated : s)));
  };

  if (loading) return <main><p>Loading album...</p></main>;
  if (error) return <main><p style={{ color: 'red' }}>{error}</p></main>;
  if (!album) return <main><p>Album not found</p></main>;

  return (
    <main>
      <h1>{album.albumName}
        <button onClick={() => navigate(`/albums/${albumId}/edit`)}>Edit</button>
        <button onClick={() => handleDelete(album._id)}>Delete</button>
</h1>
      <p>Type: {album.type}</p>
      <p>Release Date: {new Date(album.date).toLocaleDateString()}</p>
      {album.description && <p>Description: {album.description}</p>}
      <Link to={`/albums/${albumId}/songs/new`}><button>Add Song</button></Link>
      <SongList songs={songs} onDelete={handleDeleteSong} onUpdate={handleUpdateSong} />
    </main>
  );
};

export default ViewAlbum;
