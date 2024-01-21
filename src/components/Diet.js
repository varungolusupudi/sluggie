import React from 'react';
import '../form.css';
import { useNavigate } from 'react-router-dom';

const DietButton = () => {
    // Function to handle form submission
    let navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      
      // Get the value of the selected dietary lifestyle from the dropdown
      const dietaryLifestyle = document.getElementById('dietary-lifestyle').value;

      // Make sure the user has selected a dietary lifestyle
      if (dietaryLifestyle) {
        // Prepare the POST request options
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dietaryLifestyle: dietaryLifestyle }) // Send the selected option in the request body
        };

        // Send the POST request to the server
        fetch('/filter-entrees', requestOptions)
          .then(response => response.json())
          .then(data => {
            // Do something with the response data
            console.log(data);
            navigate('/goals');
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      } else {
        // If no dietary lifestyle is selected, alert the user or handle it as needed
        alert('Please select a dietary lifestyle.');
      }
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