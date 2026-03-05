import './App.css'
import { Routes, Route } from 'react-router-dom'; // adding React Router
import { useState, useEffect } from 'react'; // adding useState and Effect

import NavBar from './components/NavBar';
import Landing from './views/Landing/Landing';
import AlbumList from './components/AlbumList/AlbumList.jsx';
import ViewAlbum from './components/ViewAlbum/ViewAlbum.jsx';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import * as albumService from './services/albumService.js';



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
      console.log('albumData:', albumData);
    };
    if (user) fetchAllAlbums();
  }, [user]);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
      <Route path='/' element={<Landing user={user} />} />
      <Route path='/albumList' element={user ? <AlbumList user={user} albums={albums} /> : <Landing />} />


        {user ? (
          <>
            {/* Protected routes */}
            <Route path='/albums/:albumId' element={<ViewAlbum />} />
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
    