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
        <form className='signup-container bg-dark align-items-center'>
          <div className='signup-card col-auto'>
            <div class="form-floating mb-3">
              
                <input
                  type='text'
                  className='form-control'
                  value={username}
                  placeholder='Username'
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label for="floatingInput">Username</label>
              
              <div id="emailHelp" class="form-text text-light">We'll never share your information with anyone else.</div>
            </div>
            <div class="form-floating mb-3">
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="floatingInput">Password</label>
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
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label text-light" for="exampleCheck1">I like checkboxes</label>
            </div>
            {error && <p className='errmessage'>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
