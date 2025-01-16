import React, { useEffect, useState } from 'react'
import { addExerciseToCurrentDay, getPublicRoutines } from '../services/workoutService'
import { useAuth } from '../services/authService'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import ReactLoading from 'react-loading'

export function DisplayPublicRoutines() {
  const [publicRoutines, setPublicRoutines] = useState([])
  const [showLoading, setShowLoading] = useState(false)
  const user = useAuth()

  useEffect(() => {
    const fetchPublicRoutines = async () => {
      setShowLoading(true)
      try {
        const user = getAuth()
        const routines = await getPublicRoutines(user)
        setPublicRoutines(routines)
        console.log(routines)
      } catch (error) {
        console.error('Error fetching public routines:', error)
      }
      setShowLoading(false)
    }
    fetchPublicRoutines()
  }, [])

  function handleAddRoutineToDay(routine) {
    Object.keys(routine).map(key => {
      if (key != 'id') {
        try {
          addExerciseToCurrentDay(
            user,
            routine[key].name,
            routine[key].weightOrTime,
            routine[key].repsOrIntesityLevel,
            routine[key].setsOrDistance,
            routine[key].timed
          )
        } catch {
          console.error('error adding exercise from routine to current day')
        }
      }
    })
  }

  function checkKey(key) {
    return key != 'id'
  }

  return (
    <div>
      <Link to={'/home/addWorkout/routines'}>
        <button className="altButton">Close</button>
      </Link>
      {showLoading && <ReactLoading className="loading" type={'bubbles'} color={'teal'} height={333} width={186} />}
      <p>Public Routines:</p>
      {publicRoutines.map(routine => (
        <div key={routine.id}>
          <p>Workout Name: {routine.id}</p>
          {Object.keys(routine).map(
            key =>
              checkKey(key) && (
                <div key={key}>
                  <p>Exercise Name: {routine[key].name}</p>
                  <ul>
                    <li>
                      {routine[key].timed ? <span>Distance: </span> : <span>Sets: </span>}
                      {routine[key].setsOrDistance}
                    </li>
                    <li>
                      {routine[key].timed ? <span>Intensity Level: </span> : <span>Reps: </span>}
                      {routine[key].repsOrIntesityLevel}
                    </li>
                    <li>
                      {routine[key].timed ? <span>Time: </span> : <span>Weight: </span>}
                      {routine[key].weightOrTime}
                    </li>
                  </ul>
                </div>
              )
          )}
          <Link to={'/home/dashboard'}>
            <button onClick={() => handleAddRoutineToDay(routine)} className="monthButton">
              Add routine to day
            </button>
          </Link>
        </div>
      ))}
    </div>
  )
}
