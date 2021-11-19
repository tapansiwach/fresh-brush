import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from '../firebase/auth';
import './Dashboard.scss';
import Canvas from './Canvas';
import { auth } from '../firebase/config';

function Dashboard() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

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
            <li>Canvas</li>
            <li>Gallery</li>
            <hr />
            <li>
              <button
                className="logout__button"
                onClick={logoutUser}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="dashboard__mainContent">
          <Canvas />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
