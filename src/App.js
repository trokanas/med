import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import SymptomForm from './components/SymptomForm';
import DailyLogForm from './components/DailyLogForm';  // Import DailyLogForm component
import logo from './assets/logo.png'; // Import logo
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <img src={logo} alt="Med Personal Care" className="app-logo" />
        </header>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/record-symptom" element={<SymptomForm />} />
          <Route path="/daily-log" element={<DailyLogForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
