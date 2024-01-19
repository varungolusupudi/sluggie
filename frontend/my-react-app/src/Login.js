import React from 'react';
import './Login.css'; 

function Login() {
  const login = () => {
        // Add your login logic here
        console.log('Login clicked');
    };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <input
          type="text"
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          required
        />
        <button className="login-button" type="submit" onClick={login}>
          Login
        </button>
      </form>
      </div>
  );
}

export default Login;