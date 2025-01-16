import { useState, useEffect } from 'react'
import { addExerciseToCurrentDay, getCustomExercises } from '../services/workoutService.js'
import { useAuth } from '../services/authService.js'
import { useNavigate } from 'react-router-dom'
import ReactLoading from 'react-loading'

export function AllCustomExercises() {
  const [customExercises, setCustomExercises] = useState('')
  const [showLoading, setShowLoading] = useState(false)
  const user = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setShowLoading(true)
      const fetchCustomExercises = async () => {
        const exercises = await getCustomExercises(user)
        setCustomExercises(exercises)
        setShowLoading(false)
      }

      fetchCustomExercises()
    }
  }, [user])

  function handleAddingExercise(item) {
    navigate('/home/dashboard')
    addExerciseToCurrentDay(
      user,
      item.name,
      item.weightOrTime,
      item.repsOrIntesityLevel,
      item.setsOrDistance,
      item.timed
    )
  }

  return (
    <div>
      {showLoading && <ReactLoading className="loading" type={'spokes'} color={'teal'} height={333} width={186} />}
      {customExercises.length > 0 ? (
        customExercises.map(item => (
          <div key={item.id}>
            {!item.timed ? (
              <div>
                <p>
                  Name: {item.name}{' '}
                  <button onClick={() => handleAddingExercise(item)} className="monthButton">
                    Add Exercise
                  </button>
                </p>

                <ul>
                  <li>Reps: {item.repsOrIntesityLevel}</li>
                  <li>Weight: {item.weightOrTime}</li>
                  <li>Sets: {item.setsOrDistance}</li>
                </ul>
              </div>
            ) : (
              <div>
                <p>
                  Name: {item.name}
                  <button onClick={() => handleAddingExercise(item)} className="monthButton">
                    Add Exercise
                  </button>
                </p>
                <ul>
                  <li>Intensity Level: {item.repsOrIntesityLevel}</li>
                  <li>Time: {item.weightOrTime}</li>
                  <li>Distance: {item.setsOrDistance}</li>
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No data</p>
      )}
    </div>
  )
}
