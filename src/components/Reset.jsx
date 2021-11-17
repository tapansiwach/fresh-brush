import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Reset.scss'

function Reset() {
  const [email, setEmail] = useState(null);

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textbox"
          placeholder="email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="reset__button">
          Reset your passsord
        </button>
        <div className="reset__div">
          Don't have an account? <Link to="/register">Register</Link> now
        </div>
      </div>
    </div>
  )
}

export default Reset
