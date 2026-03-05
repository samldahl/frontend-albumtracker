const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/songs`;

const getBySongId = async (albumId) => {
  try {
    const res = await fetch(`${BASE_URL}?albumId=${albumId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Failed to fetch songs.');
    }

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const create = async (songData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(songData),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Failed to create song.');
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getBySongId, create };
