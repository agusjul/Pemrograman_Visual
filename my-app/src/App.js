import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/Sidebar"
import CreateAppointment from "./components/appointment/Create"
import AppointmentList from "./components/appointment/List"
import TodayAppointments from "./components/appointment/Today"

function App() {
  return (
    <div>
      <Sidebar />
      <CreateAppointment/>
      <AppointmentList/>
      <TodayAppointments/>
    </div>
  );
}

export default App;
