import React from 'react'
import Router from './router/Router'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster position='top-right' />
      <Router />
    </div>
  )
}

export default App