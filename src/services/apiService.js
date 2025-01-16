import { useState } from 'react'
import { addUserExcersisesDb, addWorkoutDb } from '../services/workoutService.js'
import { useAuth } from '../services/authService.js'

export async function getApiData(addOn) {
  const apiKey = 'Xrl51qDFfoM9efpFLe3fQA==99IryFKClz7aqFze'

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/exercises?${addOn}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const result = await response.json()
    console.log('in the api call------------------\n ', result)
    return result
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// export function DisplayData(props) {
//   const [sets, setSets] = useState('')
//   const [reps, setReps] = useState('')
//   const [weight, setWeight] = useState('')
//   const [time, setTime] = useState('')
//   const [fieldError, setFieldError] = useState(false)
//   const user = useAuth()

//   function handleThing(itemName) {
//     if (typeof props.setSelectedName === 'function') {
//       props.setSelectedName(itemName)
//     }
//   }

//   const handleAddWorkout = item => {
//     if (item.type != 'cardio') {
//       if (reps && weight && sets) {
//         addUserExcersisesDb(user, item.name, weight, reps, sets, false)
//         setFieldError(false)
//       } else setFieldError(true)
//     } else {
//       if (reps && time && sets) {
//         addWorkoutDb(user, item.name, weight, time, sets, true)
//         setFieldError(false)
//       } else setFieldError(true)
//     }
//   }

//   return (
//     <div>
//       {props.muscleData.length > 0 ? (
//         props.muscleData.map((item, index) => (
//           <div key={index}>
//             {props.selectedName !== item.name ? (
//               <div
//                 onClick={() => {
//                   handleThing(item.name)

//                   setWeight('')
//                   setReps('')
//                   setTime('')
//                   setSets('')
//                 }}
//               >
//                 <p className="exerciseName">Name: {item.name}</p>
//                 <p className="characteristic">Difficulty: {item.difficulty}</p>
//               </div>
//             ) : item.type === 'cardio' ? (
//               <div>
//                 <p
//                   className="exerciseName"
//                   onClick={() => {
//                     handleThing('')
//                     setWeight('')
//                     setReps('')
//                     setTime('')
//                     setSets('')
//                   }}
//                 >
//                   Name: {item.name} <button onClick={() => handleAddWorkout(item)}>Add Exercise</button>
//                 </p>
//                 {!props.custom && (
//                   <div>
//                     <p className="characteristic">Difficulty: {item.difficulty}</p>
//                     <p className="characteristic">Equipment Needed: {item.equipment}</p>
//                   </div>
//                 )}
//                 <span>
//                   {' '}
//                   Time(mm:ss) <input value={reps} onChange={e => setReps(e.target.value)}></input>
//                 </span>
//                 <p>
//                   {' '}
//                   Sets <input value={sets} onChange={e => setSets(e.target.value)}></input>
//                 </p>
//                 {fieldError && <p>Error: all fiels must be completed</p>}
//                 {!props.custom && (
//                   <div>
//                     <p className="characteristic">Instructions: {item.instructions}</p>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div>
//                 <p
//                   className="exerciseName"
//                   onClick={() => {
//                     handleThing('')
//                     setWeight('')
//                     setReps('')
//                     setTime('')
//                     setSets('')
//                   }}
//                 >
//                   Name: {item.name} <button onClick={() => handleAddWorkout(item)}>Add Exercise</button>
//                 </p>
//                 {!props.custom && (
//                   <div>
//                     <p className="characteristic">Difficulty: {item.difficulty}</p>
//                     <p className="characteristic">Equipment Needed: {item.equipment}</p>
//                   </div>
//                 )}
//                 <p>
//                   Weight<input value={weight} onChange={e => setWeight(e.target.value)}></input>
//                 </p>
//                 <span>
//                   {' '}
//                   Reps<input value={reps} onChange={e => setReps(e.target.value)}></input>
//                 </span>
//                 <p>
//                   {' '}
//                   Sets <input value={sets} onChange={e => setSets(e.target.value)}></input>
//                 </p>
//                 {fieldError && <p>Error: all fiels must be completed</p>}
//                 {!props.custom && (
//                   <div>
//                     <p className="characteristic">Instructions: {item.instructions}</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No data</p>
//       )}
//     </div>
//   )
// }

export function displayExcersise(item) {
  return (
    <div>
      <p className="exerciseName">
        Name: {item.name}
        <button className="monthButton">Add Excersise</button>
      </p>
      <ul>
        <li className="characteristic">Difficulty: {item.difficulty}</li>
        <li className="characteristic">Equipment Needed: {item.difficulty}</li>
        <li className="characteristic">Instructions: {item.instructions}</li>
      </ul>
    </div>
  )
}
