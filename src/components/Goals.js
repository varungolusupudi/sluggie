import React, { useState } from 'react';
import '../form.css'; // Adjust the path to your CSS file
import { useNavigate } from 'react-router-dom';

const HealthGoalsForm = () => {
  let navigate = useNavigate(); 
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implementation for what happens when the form is submitted
    navigate('/home'); 
  };

  const handleBack = (event) => {
    event.preventDefault();
    // Implementation for what happens when the form is submitted
    navigate('/diet'); 
  };

  const [healthGoals, setHealthGoals] = useState({
    WeightLoss: false,
    MuscleGain: false,
    ImprovedFitness: false,
    BetterDigestion: false,
    StressReduction: false,
    IncreasedEnergy: false
  });

  const handleCheckboxChange = (event) => {
    setHealthGoals({
      ...healthGoals,
      [event.target.value]: event.target.checked
    });
  };

  return (
    <div className="container">
      <h2>What are your health goals?</h2>
        <div className="checkbox-group">
          {Object.keys(healthGoals).map((goal) => (
            <label key={goal} className="checkbox-container">
              <input
                type="checkbox"
                name="health-goals"
                value={goal}
                checked={healthGoals[goal]}
                onChange={handleCheckboxChange}
              />
              {goal.replace(/([A-Z])/g, ' $1').trim()} {/* Convert camelCase to normal text */}
            </label>
          ))}
        </div>
        <div className="buttons">
          <button type="button" className="back-btn" onClick={handleBack}>BACK</button>
          <button type="submit" className="next-btn" onClick={handleSubmit}>SUBMIT</button>
        </div>
    </div>
  );
};

export default HealthGoalsForm;