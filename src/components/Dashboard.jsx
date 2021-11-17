import React from 'react'
import './Dashboard.scss'

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__sidenav">
          Side Nav
          <ul>
            <li>List Item 1</li>
            <li>List Item 2</li>
            <hr />
            <li><button className="logout__button">Logout</button></li>
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
