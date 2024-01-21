import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from 'react-router-dom';
import '../App.css'; // Update paths as necessary
import '../style.css';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
          .then(() => {
            // Password reset email sent!
            setMessage('Check your email to reset your password.');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
            console.error("Error sending password reset email", errorCode, errorMessage);
          });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="password-reset-form">
                        <h2>Reset Password</h2>
                        {message && <p className="text-success">{message}</p>}
                        {error && <p className="text-danger">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Send Password Reset Email</button>
                        </form>
                        <Link to="/sign-in">Back to Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;
