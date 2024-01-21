import React, { useState } from 'react';
import '../form.css';
import { useNavigate } from 'react-router-dom';

const AllergyButton = () => {
    const [allergies, setAllergies] = useState([]);
    const [input, setInput] = useState('');
    let navigate = useNavigate();

    const addAllergy = (newAllergy) => {
        if (newAllergy && !allergies.includes(newAllergy)) {
            setAllergies(prevAllergies => [...prevAllergies, newAllergy]);
            setInput(''); // Clear the input field
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Add the current input to the allergies state if it's not empty and not already included
        const newAllergy = input.trim();
        const updatedAllergies = newAllergy && !allergies.includes(newAllergy) 
                                 ? [...allergies, newAllergy] 
                                 : allergies;
    
        console.log("Sending Allergies to Backend:", updatedAllergies);
        
        // Now we use updatedAllergies for the fetch request
        fetch('/filter-entrees-by-allergy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ allergies: updatedAllergies }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Filtered Entrees:', data);
            // Now navigate after you get the response and have logged the data
            navigate('/diet');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
        // Clear the input field
        setInput('');
        // Update the allergies state if a new allergy was added
        if(newAllergy && !allergies.includes(newAllergy)) {
            setAllergies(updatedAllergies);
        }
    };

    

    const handleBack = (event) => {
        event.preventDefault();
        navigate('/personal');
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addAllergy(input.trim());
        }
    };
    const removeItem = (allergyToRemove) => {
        setAllergies(allergies.filter(allergy => allergy !== allergyToRemove));
    };

    return (
     <div className="container">
      <form action="#" method="post">
        <h2>What items are you allergic to?</h2>
        <div id="allergies-container">
          {allergies.map((allergy, index) => (
            <div key={index} className="allergy-box">
              {allergy}
              <span className="remove-btn" onClick={() => removeItem(allergy)}>
                ✖
              </span>
            </div>
          ))}
        </div>
        <input
          type="text"
          id="allergy-input"
          placeholder="Type an allergy and press Enter"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="buttons">
          <button type="button" className="back-btn" onClick = {handleBack}>BACK</button> 
          <button type="submit" className="next-btn" onClick = {handleSubmit}>NEXT</button>
        </div>
      </form>
    </div>
    );
}
export default AllergyButton;