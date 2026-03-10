import './App.css'
import { Routes, Route } from 'react-router-dom'; // adding React Router
import { useState, useEffect } from 'react'; // adding useState and Effect

import NavBar from './components/NavBar';
import Landing from './views/Landing/Landing';
import AlbumList from './components/AlbumList/AlbumList.jsx';
import CreateAlbum from './components/CreateAlbum/CreateAlbum.jsx';
import CreateSong from './components/CreateSong/CreateSong.jsx';
import ViewAlbum from './components/ViewAlbum/ViewAlbum.jsx';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import EditAlbum from './components/CreateAlbum/EditAlbum.jsx';import * as albumService from './services/albumService.js';



function App() {
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  

  // Check if user is already logged in on page load
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);
      setUser(parsedPayload.payload);
    }
  }, []);

  useEffect(() => {
    const fetchAllAlbums = async () => {
      const albumData = await albumService.index();
      setAlbums(albumData);
    };
    if (user) fetchAllAlbums();
  }, [user]);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
      <Route path='/' element={<Landing user={user} />} />
      <Route path='/albumList' element={user ? <AlbumList user={user} albums={albums} setAlbums={setAlbums} /> : <Landing />} />


        {user ? (
          <>
            {/* Protected routes */}
            <Route path='/albums/new' element={<CreateAlbum setAlbums={setAlbums} />} />
            <Route path='/albums/:albumId' element={<ViewAlbum setAlbums={setAlbums} />} />
            <Route path='/albums/:albumId/songs/new' element={<CreateSong setSongs={() => {}} />} />
            <Route path='/albums/:albumId/edit' element={<EditAlbum setAlbums={setAlbums} />} />
          </>
        ) : (
          <>
            {/* Guest routes */}
            <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
            <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
    