import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Register.scss'
import { register } from '../firebase/auth';
import { auth } from '../firebase/config';
import { createUserDocInDB } from '../firebase/db';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const registerUser = async () => {
    if (!name) {
      alert("Please provide a name");
    } else {
      const [uid, errorMessage] = await register(name, email, password);
      if (!errorMessage) {
        setName("");
        setEmail("");
        setPassword("");
        await createUserDocInDB(uid, name, email);
      }
    }
  }

  useEffect(() => {
    if (error) {
      console.log(`error`, error.message);
      return;
    }
    if (loading) return;
    if (user) navigate('/', { replace: true });
  }, [user, loading, error, navigate]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textbox"
          placeholder="your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          className="register__textbox"
          placeholder="email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="register__textbox"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="register__button"
          onClick={registerUser}
        >
          Register
        </button>
        <div className="register__div">
          Already have an account? <Link to="/login">Login</Link> here
        </div>
      </div>
    </div>
  )
}

export default Register
