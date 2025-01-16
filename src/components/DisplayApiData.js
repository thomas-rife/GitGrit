import React, { useState } from 'react'
import { addExerciseToCurrentDay } from '../services/workoutService'
import { Link, useNavigate } from 'react-router-dom'

export function DisplayApiData({ apiData, user, showApi, setShowApi }) {
  const [name, setName] = useState('')
  const [timed, setTimed] = useState(false)
  const [weightOrTime, setWeight] = useState('')
  const [setsOrDistance, setSets] = useState('')
  const [repsOrIntesityLevel, setReps] = useState('')
  const [fieldError, setFieldError] = useState(false)
  const reps = 'Reps: '
  const weight = 'Weights: '
  const sets = 'Sets: '
  const Distance = 'Distance: '
  const IntesityLevel = 'Intensity Level: '
  const Time = 'Time: '
  const navigate = useNavigate()

  const handleAddingExercise = (nameOfExercise, type) => {
    setName(nameOfExercise)
    if (type === 'cardio') {
      setTimed(true)
    }
    setShowApi(false)
    console.log(nameOfExercise)
    console.log(type)
  }

  function handleAddEx() {
    console.log(user)
    if (weightOrTime && setsOrDistance && repsOrIntesityLevel) {
      navigate('/home/dashboard')
      addExerciseToCurrentDay(user, name, weightOrTime, repsOrIntesityLevel, setsOrDistance, timed)
      setFieldError(false)
    } else {
      setFieldError(true)
    }
  }

  return (
    <div>
      {!showApi ? (
        <div className="Data">
          <span>Exercise Name: {name}</span>

          <button className="monthButton" onClick={() => setTimed(!timed)}>
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
          <button className="monthButton" onClick={handleAddEx}>
            Add to your exercises
          </button>
        </div>
      ) : (
        apiData.map((val, id) => (
          <div key={id}>
            <p>
              Name: {val.name}{' '}
              <button className="altButton" onClick={() => handleAddingExercise(val.name, val.type)}>
                Add Exercise
              </button>
            </p>
            <p>Difficulty: {val.difficulty}</p>
            <p>Equipment: {val.equipment}</p>
            <p>Instructions: {val.instructions}</p>
          </div>
        ))
      )}
    </div>
  )
}
