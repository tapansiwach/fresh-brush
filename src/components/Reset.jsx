import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { resetPasssord } from '../firebase/auth';
import './Reset.scss'

function Reset() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const resetUserPasssword = async (email) => {
    const { success, error } = await resetPasssord(email);
    if (success) {
      setEmail("");
      alert("email sent to reset password");
      navigate('/login');
    } else {
      alert(`error while resetting password ${error}`);
    }
  }

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
        <button
          className="reset__button"
          onClick={resetUserPasssword}
        >
          Reset your passsord
        </button>
        <div className="reset__div">
          Don't have an account? <Link className="link" to="/register">Register</Link> now
        </div>
      </div>
    </div>
  )
}

export default Reset
