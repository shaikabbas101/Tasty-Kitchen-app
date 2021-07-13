import './index.css'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

class NavBar extends Component {
  state = {
    isSelectedCart: false,
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/sign-in')
  }

  toggleHomeClass = () => {
    this.setState({
      isSelectedCart: false,
    })
  }

  toggleCartClass = () => {
    this.setState({
      isSelectedCart: true,
    })
  }

  render() {
    const {isSelectedCart} = this.state
    console.log(isSelectedCart)
    const cartClassName = isSelectedCart ? 'selected-nav-link' : ''
    const homeClassName = isSelectedCart ? '' : 'selected-nav-link'

    return (
      <nav className="navbar navbar-expand-lg navbar-light nav-background">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand d-flex flex-row align-items-center"
          >
            <img
              alt="kitchen logo"
              src="https://res.cloudinary.com/dkr26vkii/image/upload/v1625771647/Group_7420_utswiu.png"
            />
            <p className="logo-name ml-3 mt-2">Tasty Kitchen</p>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"> </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              <Link to="/" className="nav-link ">
                <button
                  className={`mr-3 ${homeClassName}`}
                  id="navHomeLink"
                  onClick={this.toggleHomeClass}
                  type="button"
                >
                  Home <span className="sr-only">(current)</span>
                </button>
              </Link>
              <Link to="/cart" className="nav-link">
                <button
                  className={`mr-3 ${cartClassName}`}
                  id="navCartLink"
                  onClick={this.toggleCartClass}
                  type="button"
                >
                  Cart
                </button>
              </Link>
              <button
                type="button"
                className="nav-logout-btn"
                onClick={this.onLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavBar)
