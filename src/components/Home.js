import React from 'react';
import '../style.css'

const Home = () => {
    return (
      <div>
        <header className="header">
          <h1 className="title">SLUGTRON</h1>
        </header>
        <nav className="navbar">
          <ul>
            <li><a href="#meal-choice">Meal Choice</a></li>
            <li><a href="#about-us">About Us</a></li>
          </ul>
        </nav>
  
        <section id="meal-choice">
          {/* Content for Meal Choice */}
        </section>
  
        <section id="about-us">
          {/* Content for About Us */}
        </section>
        
        {/* Additional content here */}
      </div>
    );
  };
  
  export default Home;