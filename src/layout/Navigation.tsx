import React from 'react'
import { Link } from 'react-router-dom'

const Navigation: React.FC = () => {
  return (
    <nav className="App-nav">
      <ul>
        <Link to="/">
          <li>Main Page</li>
        </Link>
        <Link to="/list">
          <li>Bet List</li>
        </Link>
        <Link to="/settings">
          <li>Settings</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Navigation
