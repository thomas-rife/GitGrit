import { useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { useAuth } from '../services/authService.js'
import ExerciseData from '../services/workoutService.js'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedData, setSelectedData] = useState([])
  const [selectedDay, setSelectedDay] = useState(null)
  const user = useAuth()

  const getDaysInMonth = date => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const daysInMonth = []
    const startOffset = firstDay.getDay()

    for (let i = 0; i < startOffset; i++) {
      daysInMonth.push(null)
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day)
      daysInMonth.push(currentDate)
    }
    return daysInMonth
  }

  const formatDate = date => {
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const day = date.getDate()
    return `${month}-${day}-${year}`
  }

  const getExercisesForSelectedDay = async selectedDate => {
    if (user != null) {
      const uid = user.uid
      const formattedDate = formatDate(selectedDate)
      const docs = await getDoc(doc(db, 'users', uid, 'days', formattedDate))
      if (docs.exists()) {
        const data = docs.data()
        const exercisesArray = Array.isArray(data) ? data : Object.values(data)
        setSelectedData(exercisesArray)
      } else {
        setSelectedData([])
      }
    }
  }

  const handleDayClick = day => {
    if (day) {
      setSelectedDay(day) // Update the selected day
      getExercisesForSelectedDay(day)
    }
  }

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  const handleCurrentMonth = () => {
    const newDate = new Date()
    setCurrentDate(newDate)
  }

  const daysInMonth = getDaysInMonth(currentDate)

  return (
    <div>
      <button onClick={handleCurrentMonth} className="monthButton">
        Current Month
      </button>
      <div>
        <button onClick={handlePrevMonth} className="monthButton">
          Prev Month
        </button>
        <span className="currentMonth">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={handleNextMonth} className="monthButton">
          Next Month
        </button>
      </div>
      <div className="calendar-container">
        <table className="calendar">
          <thead>
            <tr className="calendarHeader">
              {daysOfWeek.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(Math.ceil(daysInMonth.length / 7))].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(7)].map((_, colIndex) => {
                  const index = rowIndex * 7 + colIndex
                  const day = daysInMonth[index]
                  const currentDay = new Date()
                  const isCurrentDay =
                    day &&
                    day.getDate() === currentDay.getDate() &&
                    day.getMonth() === currentDay.getMonth() &&
                    day.getFullYear() === currentDay.getFullYear()
                  const isSelectedDay =
                    day &&
                    selectedDay &&
                    day.getDate() === selectedDay.getDate() &&
                    day.getMonth() === selectedDay.getMonth() &&
                    day.getFullYear() === selectedDay.getFullYear()
                  const cellStyle = isCurrentDay ? { backgroundColor: 'lightgray', color: 'black' } : {}
                  return (
                    <td
                      key={index}
                      style={cellStyle}
                      className={`calendarDays ${isSelectedDay ? 'selectedDay' : ''}`}
                      onClick={() => handleDayClick(day)}
                    >
                      {day ? day.getDate() : ''}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="data">
        {selectedData.length > 0 ? <ExerciseData array={selectedData} /> : <p>No workout data for selected day</p>}
      </div>
    </div>
  )
}

export default Calendar
