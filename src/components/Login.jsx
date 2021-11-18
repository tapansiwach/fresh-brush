import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { login } from '../firebase/auth';
import './Login.scss'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    console.log("logging user in...");
    await login(email, password);
  }

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
