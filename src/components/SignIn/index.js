import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = () => {
    this.setState({
      showSubmitError: true,
      errorMsg: 'Please enter a valid Email & Password',
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y',
      )
    } else {
      this.onSubmitFailure(data.error)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label className="label-element" htmlFor="passwordField">
          Password
        </label>
        <input
          id="passwordField"
          className="input-field"
          type="password"
          value={password}
          placeholder="password"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderUserNameField = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label className="label-element" htmlFor="usernameField">
          Username
        </label>
        <input
          id="usernameField"
          className="input-field"
          type="text"
          value={username}
          placeholder="username"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="sign-in-bg-container">
        <div className="d-md-none">
          <div className="mobile-sign-in-img-and-heading">
            <h1 className="mobile-sign-in-heading">Sign in</h1>
            <img
              className="sign-in-mobile-page-img"
              alt="sign_in_img"
              src="https://res.cloudinary.com/dkr26vkii/image/upload/v1626120962/Rectangle_1456_ugctpq.png"
            />
          </div>
          <form
            onSubmit={this.submitForm}
            className="sign-in-mobile-form-container"
          >
            <div className="input-container">
              {this.renderUserNameField()}
              {this.renderPasswordField()}
            </div>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
            <div>
              <button type="submit" className="sign-in-button">
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="sign-in-and-img-container d-none d-md-flex">
          <form
            onSubmit={this.submitForm}
            className="sign-in-form-container shadow"
          >
            <img
              className="kitchen-logo"
              alt="kitchen logo"
              src="https://res.cloudinary.com/dkr26vkii/image/upload/v1625771647/Group_7420_utswiu.png"
            />
            <p className="logo-name text-center">Tasty Kitchen</p>
            <h1 className="text-center sign-in-heading">Sign in</h1>
            <div className="input-container">
              {this.renderUserNameField()}
              {this.renderPasswordField()}
            </div>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
            <div>
              <button type="submit" className="sign-in-button">
                Sign in
              </button>
            </div>
          </form>
          <img
            className="sign-in-page-img"
            alt="sig_in_img"
            src="https://res.cloudinary.com/dkr26vkii/image/upload/v1626120962/Rectangle_1456_ugctpq.png"
          />
        </div>
      </div>
    )
  }
}

export default SignIn
