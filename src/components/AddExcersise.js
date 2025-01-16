import { useState } from 'react'
import { addUserExcersisesDb, addExerciseToCurrentDay } from '../services/workoutService.js'
import { useAuth } from '../services/authService.js'
import { Link, useNavigate } from 'react-router-dom'
import { AllCustomExercises } from './AllCustomExercises.js'

function AddExcersise() {
  const user = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [setsOrDistance, setSets] = useState('')
  const [repsOrIntesityLevel, setReps] = useState('')
  const [timed, setTimed] = useState(false)
  const [weightOrTime, setWeight] = useState('')
  const [fieldError, setFieldError] = useState(false)

  const reps = 'Reps: '
  const weight = 'Weights: '
  const sets = 'Sets: '
  const Distance = 'Distance: '
  const IntesityLevel = 'Intensity Level: '
  const Time = 'Time: '

  const handleAddUserExercise = () => {
    if (name && repsOrIntesityLevel && weightOrTime && setsOrDistance) {
      navigate('/home/dashboard')
      addUserExcersisesDb(user, name, weightOrTime, repsOrIntesityLevel, setsOrDistance, timed)
      addExerciseToCurrentDay(user, name, weightOrTime, repsOrIntesityLevel, setsOrDistance, timed)
      setFieldError(false)
    } else setFieldError(true)
  }

  return (
    <div className="Data">
      <div className="containerCustom">
        <AllCustomExercises />
      </div>

      <div className="containerAddCustom">
        <span>
          Exercise Name<input value={name} onChange={e => setName(e.target.value)}></input>
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

        {fieldError && <p>Error: all fields must be completed</p>}
        <button onClick={handleAddUserExercise} className="monthButton">
          Add to your exercises
        </button>
        <p></p>
      </div>
    </div>
  )
}
export default AddExcersise
