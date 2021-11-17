import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Register.scss'

function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <div className="register">
      <div className="register__container">
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
        <button className="register__button">
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
