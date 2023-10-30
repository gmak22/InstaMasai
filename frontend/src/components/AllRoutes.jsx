import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Homepage } from '../pages/Homepage'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { Posts } from '../pages/Posts'

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Homepage/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/posts' element={<Posts/>}></Route>
        </Routes>
    </div>
  )
}
