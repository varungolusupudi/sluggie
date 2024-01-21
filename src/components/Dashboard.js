import React, { useState, useEffect } from 'react';
import '../dash.css';

const MealDashboard = () => {
    const [breakfast, setBreakfast] = useState(null);
    const [lunch, setLunch] = useState(null);
    const [dinner, setDinner] = useState(null);

    useEffect(() => {
        fetchMealData('/get-breakfast-item', setBreakfast);
        fetchMealData('/get-top-entry', setLunch);
        fetchMealData('/get-dinner-item', setDinner);
    }, []);

    const fetchMealData = async (endpoint, setMeal) => {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (endpoint === '/get-top-entry') {
                console.log('Top entry data:', data);
            } else {
                console.log(endpoint, data);
            }
            setMeal(data);
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error);
        }
    };

    return (
        <div className="meal-container">
            <MealBox mealData={breakfast} mealType="Breakfast" />
            <MealBox mealData={lunch} mealType="Lunch" />
            <MealBox mealData={dinner} mealType="Dinner" />
        </div>
    );
};

const MealBox = ({ mealData, mealType }) => {
    if (!mealData) return <div className="meal-box">Loading...</div>;

    console.log(`MealBox (${mealType}): Data`, mealData); // Add this line to log the mealData
    console.log(`MealBox (${mealType}): mealType`, mealType);

    return (
        <div className="meal-box" id={mealType.toLowerCase()}>
          <div className="card">
              <div className="card-face front">
                  {/* Meal type label */}
                  <h2>{mealType}</h2>
                  {/* Meal data displayed below the label */}
                  <div className="meal-info">
                      <h3>{mealData.entree}</h3>
                      <p>Location: {mealData.location}</p>
                      <p>Calories: {mealData.calories}</p>
                      <p>Protein: {mealData.protein}g</p>
                      <p>Fat: {mealData.fat}g</p>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default MealDashboard;