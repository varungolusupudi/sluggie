import React from 'react';
import '../style.css'

const PersonalButton = () => {
    return (
        <div class="flex-container">
        <div class="card-container shadow">
            <div class="card">
              <div class="card-body">
                <form action="" method="get">
                    <div class="form-group">
                        <label for="name"><b>Name</b></label>
                        <input type="text" class="form-control" name="name" id="name" required />
                    </div>
                    
                    <div class="form-group">
                        <label for="age"><b>Age</b></label>
                        <input type="number" class="form-control" name="age" id="age" required />
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
                        <button type="submit" formaction="dietary_preference.html" class="btn btn-primary">
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
