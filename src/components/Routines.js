import React, { useEffect, useState } from 'react'
import { addExerciseToCurrentDay, getUserRoutines } from '../services/workoutService'
import { useAuth } from '../services/authService'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'

export function Routines() {
  const [userRoutines, setUserRoutines] = useState('')
  const user = useAuth()
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setShowLoading(true)
        try {
          console.log('--------', user)
          const routines = await getUserRoutines(user)
          setUserRoutines(routines)
        } catch (error) {
          console.error('Error fetching user routines:', error)
        }
        setShowLoading(false)
      }

      fetchData()
    }
  }, [user])

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
  function DisplayUserRoutines() {
    return (
      <div>
        {userRoutines.map(routine => (
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
              <button className="monthButton" onClick={() => handleAddRoutineToDay(routine)}>
                Add routine to day
              </button>
            </Link>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="routineContainer">
      <Link to={'/home/addWorkout/addRoutine'}>
        <button className="altButton">Create Routine</button>
      </Link>
      <Link to={'/home/addWorkout/displayPublicRoutines'}>
        <button className="altButton">Public Routines</button>
      </Link>
      {showLoading && <ReactLoading className="loading" type={'cylon'} color={'teal'} height={333} width={186} />}
      {userRoutines.length > 0 ? (
        <span>
          <p>Your Routines </p>
          <DisplayUserRoutines />
        </span>
      ) : (
        <p>No routines data yet, click Create Routine to get started</p>
      )}
    </div>
  )
}
