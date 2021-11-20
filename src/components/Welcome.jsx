import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.scss';

function Welcome() {
  return (
    <div className="welcome">
      <img
        className="welcome__image"
        src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1672&q=80"
        alt=""
      />
      <div className="welcome__action">
        <Link
          to="/register"
          className="welcome__action__link"
        >
          <h1
          >
            Discover the artist within you
          </h1>
        </Link>
      </div>
    </div>
  )
}

export default Welcome
