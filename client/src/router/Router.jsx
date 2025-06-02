import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import { EmailVerifaction } from '../pages/EmailVerifaction'
import PageNotFound from '../pages/PageNotFound'

const Router = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/email-verifaction' element={<EmailVerifaction />} />
        <Route path='*' element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default Router