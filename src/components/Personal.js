import React from 'react';
import '../style.css'
import logo from '../slugtritionlogo.png';
import { useNavigate } from 'react-router-dom';

const PersonalButton = () => {
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        navigate('/allergies'); // Navigate to the home page
    };

    return (
        <div class="flex-container">
        <div class="card-container shadow">
            <div class="card">
              <div class="card-body">
                <form action="" method="get">
                    <div class="form-group text-center">
                        <img src={logo} alt="Slugtrition Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name"><b>Name</b></label>
                        <input type="text" className="form-control" name="name" id="name" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age"><b>Age</b></label>
                        <input type="number" className="form-control" name="age" id="age" required />
                    </div>
                    
                    <div class="form-group">
                        <label for="height"><b>Height (in)</b></label>
                        <input type="number" class="form-control" name="height" id="height" required />
                    </div>
                    
                    <div class="form-group">
                        <label for="weight"><b>Weight (lb)</b></label>
                        <input type="number" class="form-control" name="weight" id="weight" required />
                    </div>
                    
                    <div class="text-right">
                        <button type="submit" onClick={handleSubmit} formaction="dietary_preference.html" class="btn btn-primary">
                            Next
                        </button>
                    </div>
                </form>
              </div>
            </div>
        </div>
    </div>
    )
}
export default PersonalButton;