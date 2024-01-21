import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../style.css'; // Make sure your CSS file paths are correct
import { ReactComponent as SlugIcon } from '../slug-icon.svg';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import TaglineTrail from './TaglineTrail';
import FAQ from './FAQ';
import ParallaxBubble from './ParallaxBubbles';
import audioFile from '../slugtrition.wav';
import audioIcon from '../audio.svg';
import pancake from '../pancake.png';
import instagram from '../instagram.svg';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container flex justify-between items-center lg:justify-around">

          {/* Hamburger Menu Button for Small Screens */}
          <button
            className="navbar-toggler order-2 lg:hidden"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg width="40px" height="40px" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
              <path className={"line " + (isOpen ? "active top" : "")} d="M144.6 447.36h910.8v60H144.6z" />
              <path className={"line " + (isOpen ? "active bottom" : "")} d="M144.6 692.64h910.8v60H144.6z" />
            </svg>
          </button>

          {/* Left-side Links for Large Screens */}
          <div className="hidden lg:flex flex-grow items-center justify-start order-1">
            <ul className="navbar-nav flex">
              <li className="nav-item mr-8">
                <Link to="/about" className="nav-link hover-underline relative before:absolute before:inset-y-0 before:left-0 before:right-0 before:bg-blue-500 before:h-0.5 before:scale-x-0 before:origin-right before:transition-transform hover:before:scale-x-100 hover:before:origin-left">
                  ABOUT
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link hover-underline relative before:absolute before:inset-y-0 before:left-0 before:right-0 before:bg-blue-500 before:h-0.5 before:scale-x-0 before:origin-right before:transition-transform hover:before:scale-x-100 hover:before:origin-left">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo for all screen sizes */}
          <div className="order-3 lg:order-2">
            <Link to="/" className="navbar-brand">
              <img src={logo} alt="SLUGTRITION Logo" style={{ height: '50px' }} />
            </Link>
          </div>

          {/* Right-side Links for Large Screens */}
          <div className="hidden lg:flex flex-grow items-center justify-end order-4">
            <ul className="navbar-nav flex">
              <li className="nav-item mr-2">
                <Link to="/sign-in" className="nav-link login-btn px-4 py-2 border-2 rounded-full">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sign-up" className="nav-link signup-btn px-4 py-2 border-2 rounded-full">
                  Get Started
                </Link>
              </li>
            </ul>

          </div>
          {/* Mobile Menu */}

          {isOpen && (
            <div className={`fixed inset-0 bg-blue-500 z-50 flex flex-col items-start lg:hidden order-5 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <button
                className="text-white p-4 transition-transform duration-500"
                onClick={() => setIsOpen(false)}
                style={{ transform: isOpen ? 'scale(1.2)' : 'scale(1)' }} // Scale the button for visual effect
              >
                {/* SVG for the exit icon */}
                <svg width="40px" height="40px" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="white" d="m642.48 600 300.72-300.84c6.8789-7.6953 9.3203-18.383 6.4609-28.297-2.8555-9.918-10.605-17.668-20.523-20.523-9.9141-2.8594-20.602-0.41797-28.297 6.4609l-300.84 300.72-300.84-300.72c-7.6953-6.8789-18.383-9.3203-28.297-6.4609-9.918 2.8555-17.668 10.605-20.523 20.523-2.8594 9.9141-0.41797 20.602 6.4609 28.297l300.72 300.84-300.72 300.84c-5.5859 5.6328-8.7109 13.254-8.6953 21.188 0.019531 7.9336 3.1758 15.535 8.7891 21.145 5.6094 5.6094 13.211 8.7695 21.145 8.7891 7.9336 0.046874 15.551-3.1094 21.121-8.7617l300.84-300.72 300.84 300.72c5.5703 5.6523 13.188 8.8086 21.121 8.7617 7.9336-0.019532 15.535-3.1797 21.145-8.7891 5.6133-5.6094 8.7695-13.211 8.7891-21.145 0.015625-7.9336-3.1094-15.555-8.6953-21.188z" />
                </svg>
              </button>
              {/* Add your mobile navigation links here */}
              <Link to="/about" className="text-white p-4 mnlinks" onClick={() => setIsOpen(false)}>ABOUT</Link>
              <Link to="/contact" className="text-white p-4 mnlinks" onClick={() => setIsOpen(false)}>CONTACT</Link>
              <div className="button-contain w-full px-4 flex flex-col items-start space-y-4 mt-4">
                <Link to="/sign-in" onClick={() => setIsOpen(false)} className="button text-sm text-center nav-link px-6 py-2 text-black font-bold transition duration-300 ease-in-out rounded-full"
                  style={{ backgroundColor: '#ffce32', color: 'inherit', textDecoration: 'inherit' }} // Removed the width
                >Login</Link>
                <Link to="/sign-up" onClick={() => setIsOpen(false)} className="button text-sm text-center nav-link px-6 py-2 text-black font-bold transition duration-300 ease-in-out rounded-full"
                  style={{ backgroundColor: '#ffce32', color: 'inherit', textDecoration: 'inherit' }} // Removed the width
                >Get Started</Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};


const AudioPlayer = ({ children }) => {
  const [audio] = useState(new Audio(audioFile));
  const [playing, setPlaying] = useState(false);

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  React.useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  React.useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return (
    <button onClick={togglePlayPause} className="flex items-center space-x-2 border-none bg-none">
      {children}
      <img src={audioIcon} alt="Play audio" className="w-6 h-6" />
    </button>
  );
};


const SlugtritionSection = () => {
  return (
    <section className="slugtrition-section">
      <div className="slugtrition-content">
        <h1>Meal Planning Simplified</h1>
        <p>Slugtrition helps you choose the best meals for your diet at UCSC.</p>
        <button className="cta-button">Get Started</button>
      </div>
    </section>
  );
};


const HeroSection = () => {
  // Replace 'path_to_your_vector.svg' with the actual path to your vector image
  const vectorImagePath = '../pancake.png';

  return (
    <section className="hero-section">
      <div className="hero-content flex flex-col md:flex-row items-center">
        <div className="text-content ml-2 sm:ml-4 md:ml-8 lg:ml-16 xl:ml-32 2xl:ml-64">
          <h1 className='heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight'>SLUGTRITION*</h1>
          <p className='text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-normal'>CUSTOMIZE YOUR MEAL <br />NOW!</p>
          <div className='my-4 text-sm md:text-base lg:text-lg leading-relaxed hidden md:block'>
            <div className="hidden md:block">
              <AudioPlayer>
                <span>* [ slug-tri-tion ]</span>
              </AudioPlayer>
              <p>noun (slugtritions, slugtritioning, slugtritioned)</p>
              <p className='tag-para'>Create a personalized meal plan using your dietary preferences and nutritional needs with ease. "With Slugtrition, my campus dining is perfectly tailored to me!"</p>
            </div>
          </div>
        </div>
        {/* Vector Image */}
        <div className="image-container flex justify-center md:block">
          <img src={pancake} alt="Decorative" className="w-32 h-auto md:w-48 lg:w-64 xl:w-96" />
        </div>
      </div>
    </section>
  );
};
//FAQ Component
const App = () => {
  const faqData = [
    { id: 1, question: 'What is SLugtrition?', answer: 'Slugtrition is a dietary planner that curates a food plan for UCSC students based on their needs and dining hall preferences' },
    { id: 2, question: 'How do I use Slugtrition', answer: 'By completing the form for dietary preferences after logging in, Slugtrition will present a dashboard with a daily plan' },
    { id: 3, question: 'How can I track my daily food intake in the app?', answer: 'To track your daily food intake, navigate to the "My Meals" section on the app. There, you can add each meal and snack with details like ingredients and quantities. The app will automatically calculate your daily nutritional intake based on the input.' },
    { id: 4, question: 'Is it possible to customize my dietary preferences and restrictions?', answer: 'Absolutely! In the "Settings" tab, you can customize your dietary preferences and restrictions. Choose from options like vegetarian, vegan, gluten-free, or specify any allergies you may have. The app will then tailor meal suggestions and track your intake accordingly.' }
    
  ];

  return (
    <div>
      <FAQ data={faqData} />
    </div>
  );
};


// Features Section Component
const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="feature">
        <h3>Personalized Meal Plans</h3>
        <p>Get meal recommendations based on your dietary preferences and goals.</p>
      </div>
      <div className="feature">
        <h3>Nutritional Insights</h3>
        <p>Track your nutritional intake with detailed information on every meal.</p>
      </div>
      {/* Add more features as needed */}
    </section>
  );
};


const PreFooter = () => {
  return (
    <div style={{ backgroundColor: 'var(--slug-yellow)', padding: '20px', textAlign: 'center' }}>
      {/* Pre-Footer content */}
      <h2>TRANSFORM YOUR DINING HALL ROUTINE WITH SLUGTRITION! 🍽️✨</h2>
      <p>Hey Slugs! Get ready to indulge in a dining hall experience that's as unique as you are. Slugtrition is here to revolutionize your meals with a personalized touch that caters to your palate and nourishes your body.</p>
      <p>Why settle for the ordinary when you can have a dining plan that's all about <strong>YOU</strong>? Embrace the art of eating well with Slugtrition—where every meal is a celebration of flavor, nutrition, and the vibrant UCSC spirit.</p>
      
      {/* Button */}
      <div className="bigpadding">
        <button className="wt-btn_sign">
          <span className="wt-btn_sign-bound">
            <span data-width="#fff" data-text="Get Started">Get Started</span>
          </span>
        </button>
      </div>
    </div>
  );
};


// Footer Component
const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f5f5f5', padding: '40px 0', borderTop: '1px solid #eaeaea' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
        {/* Logo and tagline */}
        <div style={{ marginBottom: '30px' }}>
          <img src={logo} alt="Slugtrition Logo" style={{ height: '60px', marginBottom: '20px'}} />
          <p style={{ marginToåp: '10px', color: '#333', fontSize: '18px', fontWeight: '500' }}>Nourish your life with Slugtrition.</p>
        </div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
          <a href="/about" style={{ margin: '0 15px', textDecoration: 'none', color: '#007bff', fontSize: '16px' }}>About</a>
          <a href="/contact" style={{ margin: '0 15px', textDecoration: 'none', color: '#007bff', fontSize: '16px' }}>Contact</a>
          {/* Additional Links Here */}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
          <a href="http://www.facebook.com" style={{ margin: '0 8px' }}>
            <img src={instagram} alt="Facebook" style={{ height: '24px' }} />
          </a>
          <a href="http://www.twitter.com" style={{ margin: '0 8px' }}>
            <img src={instagram} alt="Twitter" style={{ height: '24px' }} />
          </a>
          <a href="http://www.instagram.com" style={{ margin: '0 8px' }}>
            <img src={instagram} alt="Instagram" style={{ height: '24px' }} />
          </a>
        </div>

        {/* Copyright Information */}
        <div style={{ color: '#333', fontSize: '14px' }}>
          <p>© 2024 Slugtrition. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};





// Main Landing Component
const Landing = () => {
  const handleIconClick = () => {
    // You can perform any action here, like opening a modal, triggering an alert, etc.
    console.log('SVG icon clicked!');
  };

  return (
    <div className="landing d-flex flex-column vh-100">
      <Header />
      <HeroSection />
      {/* <TaglineTrail open={true} /> */}
      {/* <FeaturesSection /> */}
      {/* <ParallaxBubble text="Hello" offset={50} />
      <ParallaxBubble text="World" offset={100} /> */}
      <SlugIcon className="slug-icon" onClick={handleIconClick} />
      {/* Add other components or sections as needed */}
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Landing;
