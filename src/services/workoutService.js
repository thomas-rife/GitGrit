import { auth, db } from '../firebaseConfig'
import { updateDoc, addDoc, collection, doc, getDoc, setDoc, query, getDocs } from 'firebase/firestore'

export async function addExerciseToCurrentDay(user, name, weightOrTime, repsOrIntesityLevel, setsOrDistance, timed) {
  const uid = user.uid
  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const date = today.getDate()
  const currentDate = month + '-' + date + '-' + year

  await setDoc(
    doc(db, 'users', uid, 'days', currentDate),
    {
      [name]: {
        name,
        weightOrTime,
        repsOrIntesityLevel,
        setsOrDistance,
        timed
      }
    },
    { merge: true }
  )
}

export async function addUserExcersisesDb(user, name, weightOrTime, repsOrIntesityLevel, setsOrDistance, timed) {
  const uid = user.uid

  console.log('hi')

  await setDoc(doc(db, 'users', uid, 'userExercises', name), {
    name,
    weightOrTime,
    repsOrIntesityLevel,
    setsOrDistance,
    timed
  })
}

export function ExerciseData(array) {
  console.log(array)
  return array.array ? (
    array.array.map((item, index) => (
      <div key={index}>
        {!item.timed ? (
          <div>
            <p>Name: {item.name}</p>
            <ul>
              <li>Reps: {item.repsOrIntesityLevel}</li>
              <li>Weight: {item.weightOrTime}</li>
              <li>Sets: {item.setsOrDistance}</li>
            </ul>
          </div>
        ) : (
          <div>
            <p>Name: {item.name}</p>
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
  )
}
export default ExerciseData

export async function addRoutine(user, name, array) {
  const uid = user.uid

  const addToDB = async exercise => {
    try {
      await setDoc(
        doc(db, 'users', uid, 'routines', name),
        {
          [exercise[3]]: {
            name: exercise[3],
            weightOrTime: exercise[0],
            repsOrIntesityLevel: exercise[2],
            setsOrDistance: exercise[1],
            timed: exercise[4]
          }
        },
        { merge: true }
      )
    } catch (error) {
      console.error('Error adding routine:', error)
    }
  }
  array.forEach(addToDB)
}

export async function addPublicRoutine(user, name, array) {
  const uid = user.uid

  const addToDB = async exercise => {
    try {
      await setDoc(
        doc(db, 'publicRoutines', name),
        {
          [exercise[3]]: {
            name: exercise[3],
            weightOrTime: exercise[0],
            repsOrIntesityLevel: exercise[2],
            setsOrDistance: exercise[1],
            timed: exercise[4]
          }
        },
        { merge: true }
      )
    } catch (error) {
      console.error('Error adding routine:', error)
    }
  }
  array.forEach(addToDB)
}

export async function getUserRoutines(user) {
  console.log(user)
  const uid = user.uid
  const routinesCollection = collection(db, 'users', uid, 'routines')

  try {
    const routinesQuery = query(routinesCollection)
    const querySnapshot = await getDocs(routinesQuery)

    const userRoutines = []
    querySnapshot.forEach(doc => {
      userRoutines.push({ id: doc.id, ...doc.data() })
    })

    console.log(userRoutines)
    return userRoutines
  } catch (error) {
    console.error('Error fetching user routines:', error)
    return []
  }
}

export async function getPublicRoutines(user) {
  const uid = user.uid
  const routinesCollection = collection(db, 'publicRoutines')

  try {
    const routinesQuery = query(routinesCollection)
    const querySnapshot = await getDocs(routinesQuery)

    const publicRoutines = []
    querySnapshot.forEach(doc => {
      publicRoutines.push({ id: doc.id, ...doc.data() })
    })

    console.log(publicRoutines)
    return publicRoutines
  } catch (error) {
    console.error('Error fetching user routines:', error)
    return []
  }
}

export async function getCustomExercises(user) {
  const uid = user.uid
  const exercisesCollection = collection(db, 'users', uid, 'userExercises')

  try {
    const exercisesQuery = query(exercisesCollection)
    const querySnapshot = await getDocs(exercisesQuery)

    const customExercises = []
    querySnapshot.forEach(doc => {
      customExercises.push({ id: doc.id, ...doc.data() })
    })

    return customExercises
  } catch (error) {
    console.error('Error fetching user routines:', error)
    return []
  }
}
