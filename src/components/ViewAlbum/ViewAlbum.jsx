import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as albumService from '../../services/albumService';

const ViewAlbum = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true);
        const albumData = await albumService.show(albumId);
        setAlbum(albumData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [albumId]);

  if (loading) return <main><p>Loading album...</p></main>;
  if (error) return <main><p style={{ color: 'red' }}>{error}</p></main>;
  if (!album) return <main><p>Album not found</p></main>;

  return (
    <main>
      <h1>{album.albumName}</h1>
      <p>Type: {album.type}</p>
      <p>Release Date: {new Date(album.date).toLocaleDateString()}</p>
      {album.description && <p>Description: {album.description}</p>}
    </main>
  );
};

export default ViewAlbum;
