const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getBySongId = async (albumId) => {
  try {
    const res = await fetch(`${BASE_URL}/albums/${albumId}/songs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch songs: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const create = async (albumId, songData) => {
  try {
    const res = await fetch(`${BASE_URL}/albums/${albumId}/songs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(songData),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.err || 'Failed to create song.');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getBySongId, create };
