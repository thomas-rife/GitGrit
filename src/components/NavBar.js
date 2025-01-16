import { Link } from 'react-router-dom'
import './App.css'

function NavBar(params) {
  return (
    <nav>
      <ul>
        <Link to={'dashboard'} className="link">
          Dashboard
        </Link>
      </ul>
      <ul>
        <Link to={'calendar'} className="link">
          Calendar
        </Link>
      </ul>
      <ul>
        <Link to={'profile'} className="link">
          Profile
        </Link>
      </ul>
    </nav>
  )
}

export default NavBar
