import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './components/features/auth/Welcome'
import ReviewsList from './components/features/reviews/ReviewsList'
import UsersList from './components/features/users/UsersList'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        <Route path='dash' element={<DashLayout />}>

          <Route index element={<Welcome />} />

          <Route path='reviews'>
            <Route index element={<ReviewsList />} />   
          </Route>

          <Route path='users'>
            <Route index element={<UsersList />} />   
          </Route>
          
        </Route>

      </Route>
    </Routes>
  )
}
