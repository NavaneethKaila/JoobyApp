import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="nav-logo"
      />
      <div className="link-header-container">
        <Link to="/">
          <p className="link">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="link">Jobs</p>
        </Link>
      </div>
      <button type="button" className="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
