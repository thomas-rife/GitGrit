import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignInPage from './components/SignInPage'
import Data from './components/Data.js'
import Profile from './components/Profile.js'
import Calender from './components/Calender.js'
import Suggestion from './components/Suggestion.js'
import Dashboard from './components/Dashboard.js'
import AddExcersise from './components/AddExcersise.js'
import { Routines } from './components/Routines.js'
import { AddRoutine } from './components/AddRoutine.js'
import { DisplayPublicRoutines } from './components/DisplayPublicRoutines.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
const user = null
const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />
  },
  {
    path: 'home',
    element: <App user={user} />,
    children: [
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'addWorkout',
        element: <Data />,
        children: [
          {
            path: 'customExercises',
            element: <AddExcersise />
          },
          {
            path: 'exercises',
            element: <Suggestion />
          },
          {
            path: 'routines',
            element: <Routines />
          },
          {
            path: 'addRoutine',
            element: <AddRoutine />
          },
          {
            path: 'displayPublicRoutines',
            element: <DisplayPublicRoutines />
          }
        ]
      },
      {
        path: 'calendar',
        element: <Calender />
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
