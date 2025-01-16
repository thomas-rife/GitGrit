import { useState, useEffect } from 'react'
import { collection, query, doc, getDocs } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { useAuth } from '../services/authService.js'
import { Link, Outlet } from 'react-router-dom'

function Data() {
  const [selectedList, setSelectedList] = useState('excercises')
  const [settingExcersise, setSettingExcersise] = useState(false)
  const [customExercises, setCustomExercises] = useState([])
  const user = useAuth()

  async function getCustomExcersises() {
    if (user != null) {
      const uid = user.uid
      const q = collection(db, 'users', uid, 'workouts')
      const querySnapshot = await getDocs(q)
      const tempArray = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        tempArray.push(data)
      })
      setCustomExercises(tempArray)
    }
  }

  useEffect(() => {
    getCustomExcersises()
  }, [selectedList, settingExcersise])

  return (
    <div>
      <Link to={'/home/dashboard'}>
        <button className="monthButton">Close</button>
      </Link>
      <Link to={'/home/addWorkout/customExercises'}>
        <button className="monthButton">Custom Exercises</button>
      </Link>
      <Link to={'/home/addWorkout/exercises'}>
        <button className="monthButton">Exercises</button>
      </Link>
      <Link to={'/home/addWorkout/routines'}>
        <button className="monthButton">Routines</button>
      </Link>
      <div>
        <Outlet className="dashboardContent"></Outlet>
      </div>
    </div>
  )
}
export default Data
