import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import { EmailVerifaction } from '../pages/EmailVerifaction'
import PageNotFound from '../pages/PageNotFound'
import Home from '../pages/Home'

const Router = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/email-verifaction' element={<EmailVerifaction />} />
        <Route path='*' element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default Router