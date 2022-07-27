import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import EventsTable from './components/EventsTable/EventsTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';

function App() {
  return (
   <div>
    <Router>
    <Header/>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<EventsTable/>}/>
        <Route path='/addevent' element={<Form/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
