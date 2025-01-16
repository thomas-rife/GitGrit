import { auth, db } from '../firebaseConfig'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'

export async function addUserDb(user) {
  const uid = user.uid
  const image = user.photoURL
  const email = user.email
  const lastSignIn = user.metadata.lastSignInTime
  const displayName = user.displayName

  const data = { displayName, email, lastSignIn, image }
  await setDoc(doc(db, 'users', uid), {
    data
  })
}

export async function getUserByUid(uid) {
  const docRef = doc(db, 'users', uid.uid)
  const docSnap = await getDoc(docRef)
  const data = docSnap.data()
  return data
}

export function getUserPhoto(user) {
  return user.photoURL
}
