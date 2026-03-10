const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/albums`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Failed to fetch albums.');
    }

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const show = async (albumId) => {
  try {
    const res = await fetch(`${BASE_URL}/${albumId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Failed to fetch album.');
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const create = async (albumData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(albumData),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.err || 'Failed to create album.');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const deleteAlbum = async (albumId) => {
  const res = await fetch(`${BASE_URL}/${albumId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  if (!res.ok) throw new Error('Failed to delete album.');
};

const updateAlbum = async (albumId, albumData) => {
  const res = await fetch(`${BASE_URL}/${albumId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(albumData),
  });
  if (!res.ok) throw new Error('Failed to update album.');
  return res.json();
};

export { index, show, create, deleteAlbum, updateAlbum };
