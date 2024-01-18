import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import SignInForm  from './components/SignInForm';
import './App.css';
import './style.css';




function App() {
  return (
      <><CustomCursor /><SignInForm /></>
  );
}

export default App;
