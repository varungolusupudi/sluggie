import React from 'react';
import '../form.css';
import { useNavigate } from 'react-router-dom';

const DietButton = () => {
    // Function to handle form submission
    let navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      // Implementation for what happens when the form is submitted
      navigate('/goals'); 
    };
  
    // Function to handle the back button (you might want to navigate to a previous page)
    const handleBack = () => {
      // Implementation for the back button
      console.log('Go back to the previous page');
      navigate('/allergies')
    };
  
    return (
        <div className="container">
        <h2>Choose your dietary lifestyle</h2>
          <select name="dietary-lifestyle" id="dietary-lifestyle">
            <option value="">--Select your dietary lifestyle--</option>
            <option value="omnivore">Omnivore</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="mediterranean">Mediterranean</option>
          </select>
          <div className="buttons">
            <button type="button" onClick={handleBack} className="back-btn">BACK</button>
            <button type="submit" onClick={handleSubmit} className="next-btn">NEXT</button>
          </div>
      </div>
    );
  };
  
  export default DietButton;