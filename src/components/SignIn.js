import { Link } from 'react-router-dom'

function SignIn() {
  return (
    <Link to={'/'}>
      <button className="signOut">Sign in</button>
    </Link>
  )
}
export default SignIn
