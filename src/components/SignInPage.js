import SignIn, { LoginButton } from '../services/authService.js'
import { useAuth } from '../services/authService'
import { addUserDb } from '../services/userServices.js'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router'
import './SignInPage.css'

function SignInPage() {
  const user = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      addUserDb(user)
      navigate('home/dashboard')
    }
  }, [user])

  return (
    <div className="SignInPage">
      <div className="SignInBackground">
        <p className="Title">GitGrit</p>

        <p className="describe">A new way to track your fitness!</p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDkkT_A2LTY31m3p7KWSaJSaJSy6Zt5bpCA&usqp=CAU"
          alt="workout"
        ></img>
        <p className="describe2">Please sign in to continue</p>
        <LoginButton />

        <footer className="footer">
          Link to Image:{' '}
          <a href="https://www.pinterest.com/pin/452963675006621750/" className="footer1">
            Here
          </a>
        </footer>
      </div>
    </div>
  )
}

export default SignInPage
