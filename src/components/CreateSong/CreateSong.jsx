import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as songService from '../../services/songService';

const CreateSong = ({ setSongs }) => {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [formData, setFormData] = useState({
    songName: '',
    trackNumber: '',
    notes: '',
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
      if (!formData.songName || !formData.trackNumber) {
        setError('Song name and track number are required.');
        setLoading(false);
        return;
      }

      const newSong = await songService.create(albumId, formData);
      
      // Update songs list
      setSongs((prev) => [...prev, newSong]);
      
      // Redirect back to album
      navigate(`/albums/${albumId}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main>
      <h2>Create Song</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="songName">Song Name *</label>
          <input
            type="text"
            id="songName"
            name="songName"
            value={formData.songName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="trackNumber">Track Number *</label>
          <input
            type="number"
            id="trackNumber"
            name="trackNumber"
            value={formData.trackNumber}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Song'}
        </button>
      </form>
    </main>
  );
};

export default CreateSong;
