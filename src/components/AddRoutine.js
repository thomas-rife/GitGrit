import React, { useState } from 'react'
import { addPublicRoutine, addRoutine } from '../services/workoutService'
import { useAuth } from '../services/authService'
import { Link } from 'react-router-dom'

export function AddRoutine() {
  const [name, setName] = useState('')
  const [exeriseArray, setExerciseArray] = useState([])
  const [showH, setShowH] = useState(false)
  const user = useAuth()
  const [showPublicButton, setShowPublicButton] = useState(true)
  const reps = 'Reps: '
  const weight = 'Weights: '
  const sets = 'Sets: '
  const Distance = 'Distance: '
  const IntesityLevel = 'Intensity Level: '
  const Time = 'Time: '

  function mapArray() {
    if (exeriseArray.length > 0) {
      console.log(exeriseArray)
      return exeriseArray.map((val, index) => (
        <div key={index}>
          <p className="RoutinesParagraph">Exercise: {val[3]}</p>
          {!val[4] ? <p>Weight: {val[0]}</p> : <p>Time: {val[0]} </p>}
          {!val[4] ? <p>Sets: {val[1]}</p> : <p>Distance: {val[1]} </p>}
          {!val[4] ? <p>Reps: {val[2]}</p> : <p>Intesity Level: {val[2]} </p>}
        </div>
      ))
    } else {
      return <p>No data in Array</p>
    }
  }

  function HandlePlusExercise() {
    const [exerciseName, setExerciseName] = useState('')
    const [weightOrTime, setWeight] = useState('')
    const [setsOrDistance, setSets] = useState('')
    const [repsOrIntesityLevel, setReps] = useState('')
    const [timed, setTimed] = useState(false)

    function handleAdd() {
      setShowPublicButton(true)
      setExerciseArray([...exeriseArray, [weightOrTime, setsOrDistance, repsOrIntesityLevel, exerciseName, timed]])
      mapArray()
    }

    return (
      <div>
        {mapArray()}
        <span>
          Exercise Name<input value={exerciseName} onChange={e => setExerciseName(e.target.value)}></input>
        </span>

        <button onClick={() => setTimed(!timed)} className="monthButton">
          Toggle Time/Weight
        </button>

        <span>
          {!timed ? <p>{sets}</p> : <p>{Distance}</p>}
          <input value={setsOrDistance} onChange={e => setSets(e.target.value)}></input>
        </span>

        <span>
          {!timed ? <p>{weight}</p> : <p>{Time}</p>}
          <input value={weightOrTime} onChange={e => setWeight(e.target.value)}></input>
        </span>

        <span>
          {!timed ? <p>{reps}</p> : <p>{IntesityLevel}</p>}

          <input value={repsOrIntesityLevel} onChange={e => setReps(e.target.value)}></input>
        </span>
        {exerciseName && repsOrIntesityLevel && setsOrDistance && weightOrTime ? (
          <div>
            <button onClick={handleAdd} className="monthButton">
              Add to Workout
            </button>
          </div>
        ) : (
          <div>
            <button className="monthButton">Add to Workout</button>
            <p>All fields must have data</p>
          </div>
        )}
      </div>
    )
  }

  function handlePlusExercise() {
    setShowH(true)
  }

  function handlePublicClick() {
    addPublicRoutine(user, name, exeriseArray)
    setShowPublicButton(false)
  }

  return (
    <div>
      <p>
        <Link to={'/home/addWorkout/routines'}>
          <button className="altButton">Close</button>
        </Link>
      </p>
      <span>
        Workout Name
        <input value={name} onChange={e => setName(e.target.value)} />
      </span>
      <button onClick={handlePlusExercise} className="plus">
        +
      </button>
      {showH && (
        <div>
          <HandlePlusExercise />
          {name ? (
            <div>
              <Link to={'/home/addWorkout/routines'}>
                <button onClick={() => addRoutine(user, name, exeriseArray)} className="monthButton">
                  Add workout to db
                </button>
              </Link>
              {showPublicButton ? (
                <button onClick={() => handlePublicClick()} className="monthButton">
                  Make Public
                </button>
              ) : (
                <p>Added to public workouts</p>
              )}
            </div>
          ) : (
            <div>
              <button className="monthButton">Add workout to db</button>
              <p>Must give a workout a name</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
