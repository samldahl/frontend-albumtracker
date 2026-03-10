import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as albumService from '../../services/albumService';

const EditAlbum = ({ setAlbums }) => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ albumName: '', type: 'Album', date: '', description: '' });

  useEffect(() => {
    const fetchAlbum = async () => {
      const album = await albumService.show(albumId);
      setFormData({ ...album, date: album.date?.slice(0, 10) });
    };
    fetchAlbum();
  }, [albumId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await albumService.updateAlbum(albumId, formData);
    setAlbums((prev) => prev.map((a) => (a._id === albumId ? updated : a)));
    navigate(`/albums/${albumId}`);
  };

  return (
    <main>
      <h2>Edit Album</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="albumName">Album Name *</label>
          <input type="text" id="albumName" name="albumName" value={formData.albumName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="type">Type *</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} required>
            <option value="Album">Album</option>
            <option value="EP">EP</option>
            <option value="Single">Single</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Release Date *</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </main>
  );
};

export default EditAlbum;