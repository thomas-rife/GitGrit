import Data from './Data.js'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { useAuth } from '../services/authService.js'
import ExerciseData from '../services/workoutService.js'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'

function Dashboard() {
  const [addingWorkout, setAddingWorkout] = useState(false)
  const [todaysData, setTodaysData] = useState([])
  const [showLoading, setShowLoading] = useState(false)

  const user = useAuth()

  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const date = today.getDate()
  const currentDate = month + '-' + date + '-' + year

  async function getTodaysExcersises() {
    if (user != null) {
      setShowLoading(true)

      const uid = user.uid
      const docs = await getDoc(doc(db, 'users', uid, 'days', currentDate))
      if (docs.exists()) {
        const data = docs.data()
        const exercisesArray = Array.isArray(data) ? data : Object.values(data)
        setTodaysData(exercisesArray)
      } else {
        setTodaysData([])
      }
      setShowLoading(false)
    }
  }
  useEffect(() => {
    getTodaysExcersises()
  }, [user, addingWorkout])

  return (
    <div>
      <div>
        <p onClick={() => getTodaysExcersises()} className="mainheadings">
          Your Dashboard
        </p>
        <div>
          <p className="mainheadings">
            Today's Exercises
            <Link to={'/home/addWorkout'}>
              <button onClick={() => setAddingWorkout(true)} className="monthButton">
                Add Workout
              </button>
            </Link>
          </p>
          {showLoading && <ReactLoading className="loading" type={'cubes'} color={'teal'} height={333} width={186} />}
          {todaysData.length > 0 ? <ExerciseData array={todaysData} /> : <p>You have no data today</p>}
        </div>
      </div>
    </div>
  )
}
export default Dashboard
