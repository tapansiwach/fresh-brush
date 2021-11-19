import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from '../firebase/auth';
import './Dashboard.scss';
import Canvas from './Canvas';
import { auth } from '../firebase/config';
import Gallery from './Gallery';

function Dashboard() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [view, setView] = useState("canvas");

  const logoutUser = async () => {
    await logout();
  }

  useEffect(() => {
    if (error) {
      console.log(`error`, error.message);
      return;
    }
    if (loading) return;
    if (!user) navigate('/login', { replace: true });
  }, [user, loading, error, navigate]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__sidenav">
          <ul>
            <li
              onClick={e => setView("canvas")}
              className={(view === "canvas") ? "active" : ""}
            >
              Canvas
            </li>
            <li
              onClick={e => setView("gallery")}
              className={(view === "gallery") ? "active" : ""}
            >
              Gallery
            </li>
            <hr />
            <li
              className="logout__button"
              onClick={logoutUser}
            >
              Logout
            </li>
          </ul>
        </div>
        <div className="dashboard__mainContent">
          {view === "canvas" && <Canvas />}
          {view === "gallery" && <Gallery />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
