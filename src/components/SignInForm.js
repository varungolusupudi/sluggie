import React, { useState } from 'react';
import '../App.css'; 
import '../style.css'
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const Navigate = useNavigate();

    // Toggle the visibility of the password
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    // Example function to handle form submission
    const handleSubmit = (e) => {
        //e.preventDefault();
        // Handle sign-in logic here
        Navigate('/Personal')
    };

    return (
        <div className="container main-content">
            <div className="row">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <div className="form-pane rounded shadow">
                        <form onSubmit={handleSubmit} className="form-example">
                            <h1 className="text-lg">Log in</h1>
                            <p>Welcome back! Please enter your details</p>

                            <label htmlFor="email"><b>Email</b></label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="form-control mb-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor="password"><b>Password</b></label>
                            <div className="input-group mb-2 custom-input-group">
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    required
                                    className="form-control custom-form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <i className={`fas fa-eye${passwordShown ? '' : '-slash'}`}></i>
                                    </button>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-block mt-2" type="submit">Log in</button>
                        </form>

                        {/* Google Sign-in Button */}
                        <div className="form-example mt-4">
                            <div className="divider-container">
                                <hr className="divider-line" />
                                <span className="divider-text">Or Continue With</span>
                                <hr className="divider-line" />
                            </div>

                            <div className="d-flex justify-content-center mt-4">
                                {/* Google Sign-in logic here */}
                                <button type="button" className="btn google-btn" style={{ border: '1px solid #ccc' }}>
                                    <img src="goog.png" alt="Google" style={{ height: '20px' }} />
                                    Google
                                </button>
                            </div>
                        </div>

                        <div className="text-center mt-12 text-gray-500 mx-auto">
                            Don't have an account? <a href="/signup" className="purple-link text-base">Sign up</a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-8 mx-auto">
                    <img src="img.jpg" alt="Descriptive Text" className="img-fluid rounded" />
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
