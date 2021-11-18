import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { login } from '../firebase/auth';
import './Login.scss'
import { auth } from '../firebase/config';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const loginUser = async () => {
    console.log("logging user in...");
    await login(email, password);
  }

  useEffect(() => {
    if (error) {
      console.log(`error`, error.message);
      return;
    }
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading, error, navigate])

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textbox"
          placeholder="email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login__textbox"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="login__button"
          onClick={loginUser}
        >
          Login
        </button>
        <div className="login__div">
          Don't have an account? <Link to="/register">Register</Link> now
        </div>
        <div className="login__div">
          Forgot Your Password? Reset it <Link to="/reset">here</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
