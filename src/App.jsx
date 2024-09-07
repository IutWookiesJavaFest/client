import React, { useState, useEffect } from 'react'
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import './App.css'
import {useUserContext, UserProvider} from './context/UserContext';
import { checkLogin } from './utils/checkLogin';
import Homepage from './pages/homepage/Homepage';
import Signup from './pages/auth/signup/Signup';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import Profile from './pages/profile/profile/Profile';
import DoctorList from './pages/doctors/doctorlist/DoctorList';
import DoctorView from './pages/doctors/doctorview/DoctorView';
import Hospital from './pages/doctors/hospital/Hospital';
import Chat from './pages/chat/Chat';
import Todo from './pages/profile/todo/Todo';
import TodoCreate from './pages/profile/todo/TodoCreate';
import TodoUpdate from './pages/profile/todo/TodoUpdate';
import Medicine from './pages/doctors/medicine/Medicine';
import MedicineView from './pages/doctors/medicine/MedicineView';
import MedicineCreate from './pages/doctors/medicine/MedicineCreate';
import MedicineUpdate from './pages/doctors/medicine/MedicineUpdate';

const App = () => {
  const loggedIn = checkLogin();
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={ <Homepage />} exact/>
            <Route path="/signup" element={loggedIn ? <Navigate to="/" replace />: <Signup />} />

            <Route element={<PublicRoute/>}>
              <Route path='/doctors/list' element={<DoctorList/>} />
              <Route path='/medicine' element={<Medicine/>} />
            </Route>
            
            <Route element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile/>} />
              
              <Route path='/profile/todo' element={<Todo/>} />
              <Route path='/profile/todo/create' element={<TodoCreate/>} />
              <Route path='/profile/todo/update' element={<TodoUpdate/>} />
              
              <Route path = '/doctors/view/:doctorId' element={<DoctorView />} />
              <Route path = '/hospitals/map' element={<Hospital />} />
              
              <Route path="/chat" element={<Chat/>} />

              <Route path='/medicine/view/:id' element={<MedicineView/>} />
              <Route path='/medicine/create' element={<MedicineCreate/>} />
              <Route path='/medicine/update' element={<MedicineUpdate/>} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App