import './App.css'
import { Routes, Route } from 'react-router-dom'; // adding React Router
import { useState, useEffect } from 'react'; // adding useState

import NavBar from './components/NavBar';
import Landing from './views/Landing/Landing';
import Dashboard from './views/Dashboard/Dashboard';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

function App() {
  const [user, setUser] = useState(null);

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

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes */}
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