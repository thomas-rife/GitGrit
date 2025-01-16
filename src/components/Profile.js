import { getUserPhoto } from '../services/userServices'
import { useAuth } from '../services/authService'

function Profile(props) {
  const user = useAuth()
  return (
    <div>
      {user ? (
        <div>
          <p>User: {user.displayName}</p>
          <p>
            <img className="userImage" src={getUserPhoto(user)} alt="user"></img>
          </p>
          <p>Last sign in: {user.metadata.lastSignInTime}</p>
        </div>
      ) : (
        <p>Sign in to see user profiles</p>
      )}
    </div>
  )
}
export default Profile
