import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { User } from 'ProjectPlanner/types'
import { Heading } from 'ProjectPlanner/Heading'
import { Notice } from 'ProjectPlanner/Notice'
import { api } from 'ProjectPlanner/api'

type Props = {
  onAuthenticated?(user: User): void
}

export const LoginForm: React.FC<Props> = ({ onAuthenticated }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    api.auth
      .login(username, password)
      .then((user: User) => {
        onAuthenticated && onAuthenticated(user)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  function handleShowPassword(event: React.ChangeEvent) {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        <Notice>
          <div>
            Don't want to create an account? Login with the username <b>student</b> and the password{' '}
            <b>student</b>
          </div>
        </Notice>
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div>
          <input
            className="form-field"
            aria-label="Username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            className="form-field"
            aria-label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
          />
          <label>
            <input
              onChange={handleShowPassword}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{' '}
            show password
          </label>
        </div>

        <footer className="flex-split">
          <div>
            <button type="submit" className="button">
              {!loading ? (
                <>
                  <FaSignInAlt /> <span>Login</span>
                </>
              ) : (
                <span>Loading ...</span>
              )}
            </button>
          </div>
          <div>
            Don't have an account? <Link to="/signup">Signup.</Link>
          </div>
        </footer>
      </form>
    </div>
  )
}

export default LoginForm
