import { Outlet, useParams } from 'react-router'
import './App.css'
import { Link } from 'react-router-dom'
import SignIn from './SignIn'
import NavBar from './NavBar'
import { SignOut, useAuth } from '../services/authService'
import { useEffect, useState } from 'react'
import { addUserDb, getUserPhoto } from '../services/userServices'

function App() {
  const user = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navboxClassName = `Navbox ${isMenuOpen ? 'active' : ''}`

  return (
    <div className="App">
      <header className="App-header">
        <button className="menuButton" onClick={toggleMenu}>
          ☰
        </button>
        <span className="MainTitle">GitGrit</span>
        {user ? (
          <Link to="profile">
            <img className="userImage" src={getUserPhoto(user)} alt="user" />
          </Link>
        ) : (
          <span className="signoutText">Sign in to view your profile</span>
        )}
        {user ? <SignOut /> : <SignIn />}
      </header>
      {isMenuOpen && (
        <div className={navboxClassName}>
          <NavBar />
        </div>
      )}
      <Outlet className="Content" />
    </div>
  )
}

export default App
