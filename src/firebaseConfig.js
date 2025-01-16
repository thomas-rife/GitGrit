// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBLXGThw38_hf_-eWwaSg0atwaoQOt24aY',
  //process.env.REACT_APP_APIKEY,
  authDomain: 'bottom-right.firebaseapp.com',
  projectId: 'bottom-right',
  storageBucket: 'bottom-right.appspot.com',
  messagingSenderId: '901365042249',
  appId: '1:901365042249:web:9ff0bc4b6dca8d7a0d4398',
  measurementId: 'G-WC36RNRX6T'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
