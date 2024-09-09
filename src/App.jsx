import React, { useState, useEffect } from 'react'
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import './App.css'
import {useUserContext, UserProvider} from './context/UserContext';
import { checkLogin } from './utils/checkLogin';
import Homepage from './pages/homepage/Homepage';
import Signup from './pages/auth/signup/Signup';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import Profile from './pages/profile/Profile';
import DoctorList from './pages/doctors/doctorlist/DoctorList';
import DoctorView from './pages/doctors/doctorview/DoctorView';
import Hospital from './pages/hospital/Hospital';
import Chat from './pages/chat/Chat';
import Todo from './pages/todo/Todo';
import TodoCreate from './pages/todo/TodoCreate';
import TodoUpdate from './pages/todo/TodoUpdate';
import Medicine from './pages/medicine/Medicine';
import MedicineView from './pages/medicine/MedicineView';
import MedicineCreate from './pages/medicine/MedicineCreate';
import MedicineUpdate from './pages/medicine/MedicineUpdate';
import DoctorCreate from './pages/doctors/DoctorCreate';
import DoctorUpdate from './pages/doctors/DoctorUpdate';
import ProfileUpdate from './pages/profile/ProfileUpdate';
import HealthAdd from './pages/health/HealthAdd';
import { HealthHistory } from './pages/health/HealthHistory';

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
              <Route path='/profile/update' element={<ProfileUpdate/>} />
              
              <Route path='/profile/todo' element={<Todo/>} />
              <Route path='/profile/todo/create' element={<TodoCreate/>} />
              <Route path='/profile/todo/update' element={<TodoUpdate/>} />
              
              <Route path = '/doctors/view/:id' element={<DoctorView />} />
              <Route path = '/doctors/create' element={<DoctorCreate />} />
              <Route path = '/doctors/update' element={<DoctorUpdate />} />
              <Route path = '/hospitals/map' element={<Hospital />} />
              
              <Route path="/chat" element={<Chat/>} />

              {/* <Route path='/medicine/view/:id' element={<MedicineView/>} /> */}
              <Route path='/medicine/view/:id' element={<MedicineView/>} />
              <Route path='/medicine/create' element={<MedicineCreate/>} />
              <Route path='/medicine/update' element={<MedicineUpdate/>} />

              <Route path='/health/add' element={<HealthAdd/>} />
              <Route path='/health/history' element={<HealthHistory/>} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App