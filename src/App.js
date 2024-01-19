import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import SignInForm  from './components/SignInForm';
import './App.css';
import './style.css';
import PersonalButton from './components/Personal';
import AllergyButton from './components/Allergy'; // Import the component
import Home from './components/Home';
import DietButton from './components/Diet';
import GoalsButton from './components/Goals';


function App() {
  return (
    <Router>
       <CustomCursor /> {/* Render CustomCursor on all pages */}
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/personal" element={<PersonalButton />} />
        <Route path="/diet" element={<DietButton />} />
        <Route path="/goals" element={<GoalsButton />} />
        <Route path="/allergies" element={<AllergyButton />} /> {/* Add the route for allergies */}
    </Routes>
  </Router>
  );
}

export default App;
