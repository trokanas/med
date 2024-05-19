import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Med</h1>
      <div className="landing-buttons">
        <Link to="/register">
          <button className="landing-button">Register</button>
        </Link>
        <Link to="/login">
          <button className="landing-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
