import React, { useState } from 'react';
import '../form.css';
import { useNavigate } from 'react-router-dom';

const AllergyButton = () => {
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        navigate('/diet'); // Navigate to the home page
    };

    const handleBack = (event) => {
        event.preventDefault();
        navigate('/personal');
    }

    const [allergies, setAllergies] = useState([]);
    const [input, setInput] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        const allergy = input.trim();
        if (allergy) {
            setAllergies([...allergies, allergy]);
            setInput('');
        }
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