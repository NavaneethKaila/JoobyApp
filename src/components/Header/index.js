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
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="link-header-container">
        <Link to="/">
          <li className="link">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="link">Jobs</li>
        </Link>
        <li className="link logout-button">
          <button type="button" className="button" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
