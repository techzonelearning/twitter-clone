import React, { useEffect } from 'react'
import Router from './router/Router'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const App = () => {
  let { isAuthenticated, user } = useSelector(state => state.auth)
  let navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated && user.isVerify) {
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [])

  return (
    <div>
      <Toaster position='top-right' />
      <Router />
    </div>
  )
}

export default App