import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // replaced useHistory with useNavigate as useHistory is deprecated
import NavBar from './NavBar.jsx';

const LoginSignup = ({ onLogin, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // replaced history with navigate

  const login = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('All fields required');
      return;
    }

    try {
      const response = await axios.post('api/login', { username, password });
      if (response.status === 200) {
        onLogin();
        setUser(username)
        navigate('/user'); // updated history.push with navigate
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid credentials');
      console.error(err);
    }
  };

  const signup = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('All fields required');
      return;
    }

    try {
      await axios.post('api/signup', { username, password });
      setError('Signup successful. Please login.');
    } catch (err) {
      setError('Signup failed. Username might already be in use.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div>
      <NavBar />
      </div>

      <div>
        <form className='signup-container bg-dark'>
          <div className='signup-card'>
            <div>
              <input
                type='text'
                className='form-control'
                value={username}
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="btn-group">
              <button className='btn btn-secondary text-light py-2' onClick={login}>
                Login
              </button>
              <div class="alert alert-dark px-0"></div>
              <button className='btn btn-secondary text-dark py-2' onClick={signup}>
                Sign Up
              </button>
            </div>
            {error && <p className='errmessage'>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
