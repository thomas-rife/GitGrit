import { useState, useEffect } from 'react'
import { useAuth } from '../services/authService.js'
import { getApiData } from '../services/apiService.js'
import { DisplayApiData } from './DisplayApiData.js'
import ReactLoading from 'react-loading'

function Suggestion() {
  const [apiParameter, setApiParameter] = useState(undefined)
  const [listType, setListType] = useState('muscle')
  const [selectedName, setSelectedName] = useState('')
  const [muscleData, setMuscleData] = useState([])
  const [showApi, setShowApi] = useState(true)
  const [showLoading, setShowLoading] = useState(false)
  const user = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      setShowApi(true)
      try {
        const data = await getApiData(apiParameter)
        setMuscleData(data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
      setShowLoading(false)
    }
    if (apiParameter) {
      fetchData()
    }
  }, [apiParameter])

  return (
    <div>
      {user ? (
        <div>
          <p className="listheading">
            List By:
            <select
              name="type"
              id="type"
              value={listType}
              onChange={e => {
                setListType(e.target.value)
                setApiParameter(undefined)
              }}
              className="select"
            >
              <option value="muscle" className="list">
                Muscle Group
              </option>
              <option value="type">Exercise Type</option>
            </select>
            {listType == 'muscle' && (
              <select
                name="muscle"
                id="muscle"
                value={apiParameter}
                onChange={e => {
                  setApiParameter(e.target.value)
                }}
                className="select"
              >
                <option value="" disabled={apiParameter !== undefined}>
                  Target Muscle
                </option>
                <option value="muscle=abdominals">Abdominals</option>
                <option value="muscle=abductors">Abductors</option>
                <option value="muscle=adductors">Adductors</option>
                <option value="muscle=biceps">Biceps</option>
                <option value="muscle=calves">Calves</option>
                <option value="muscle=chest">Chest</option>
                <option value="muscle=forearms">Forearms</option>
                <option value="muscle=hamstrings">Hamstrings</option>
                <option value="muscle=lats">Lats</option>
                <option value="muscle=lower_back">Lower_back</option>
                <option value="muscle=middle_back">Middle_back</option>
                <option value="muscle=neck">Neck</option>
                <option value="muscle=quadriceps">Quadriceps</option>
                <option value="muscle=traps">Traps</option>
                <option value="muscle=triceps">Triceps</option>
              </select>
            )}
            {listType == 'type' && (
              <select
                name="cardio"
                id="cardio"
                value={undefined}
                onChange={e => {
                  setApiParameter(e.target.value)
                }}
                className="select"
              >
                <option value="" disabled={apiParameter !== undefined}>
                  Type
                </option>
                <option value="type=cardio">Cardio</option>
                <option value="type=olympic_weightlifting">Olympic Weightlifting</option>
                <option value="type=plyometrics">Plyometrics</option>
                <option value="type=powerlifting">Powerlifting</option>
                <option value="type=strength">Strength</option>
                <option value="type=stretching">Stretching</option>
                <option value="type=strongman">Strongman</option>
              </select>
            )}
          </p>
          <p></p>
          <div>
            {showLoading && (
              <ReactLoading className="loading" type={'spinningBubbles'} color={'teal'} height={333} width={186} />
            )}
            <DisplayApiData apiData={muscleData} user={user} showApi={showApi} setShowApi={setShowApi} />
          </div>{' '}
        </div>
      ) : (
        <p>Sign in to record data</p>
      )}
    </div>
  )
}
export default Suggestion
