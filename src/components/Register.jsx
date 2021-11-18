import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Register.scss'
import { register } from '../firebase/auth';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    if (!name) {
      alert("Please provide a name");
    } else {
      register(name, email, password);
    }
  }

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
