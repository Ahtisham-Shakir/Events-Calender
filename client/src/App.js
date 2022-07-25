import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import EventsTable from './components/EventsTable/EventsTable';

function App() {
  return (
   <div>
    <Router>
    <Header/>
      <Routes>
        <Route path='/' element={<EventsTable/>}/>
        <Route path='/addevent' element={<Form/>}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
