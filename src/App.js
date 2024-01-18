import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import SignInForm  from './components/SignInForm';
import './App.css';
import './style.css';
import PersonalButton from './components/Personal';
import Home from './components/Home';




function App() {
  return (
    <Router>
       <CustomCursor /> {/* Render CustomCursor on all pages */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/personal" element={<PersonalButton />} />
    </Routes>
  </Router>
  );
}

export default App;
