import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as albumService from '../../services/albumService';

const CreateAlbum = ({ setAlbums }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    albumName: '',
    type: 'Album',
    date: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.albumName || !formData.date) {
        setError('Album name and release date are required.');
        setLoading(false);
        return;
      }

      const newAlbum = await albumService.create(formData);
      
      // Update albums list
      setAlbums((prev) => [...prev, newAlbum]);
      
      // Redirect to album list
      navigate('/albumList');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main>
      <h2>Create Album</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="albumName">Album Name *</label>
          <input
            type="text"
            id="albumName"
            name="albumName"
            value={formData.albumName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="type">Type *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="Album">Album</option>
            <option value="EP">EP</option>
            <option value="Single">Single</option>
          </select>
        </div>

        <div>
          <label htmlFor="date">Release Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Album'}
        </button>
      </form>
    </main>
  );
};

export default CreateAlbum;
