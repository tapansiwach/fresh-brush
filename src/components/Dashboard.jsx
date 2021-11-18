import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from '../firebase/auth';
import './Dashboard.scss'
import { auth } from '../firebase/config';

function Dashboard() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const logoutUser = async () => {
    console.log("logging out...");
    await logout();
    console.log("user logged out")
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
          Side Nav
          <ul>
            <li>List Item 1</li>
            <li>List Item 2</li>
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
          Main Content
        </div>
      </div>
    </div>
  )
}

export default Dashboard
