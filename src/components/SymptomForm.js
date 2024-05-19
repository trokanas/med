import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SymptomForm = () => {
  const [symptom, setSymptom] = useState('');
  const [severity, setSeverity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (severity < 0 || severity > 10) {
      setError('Severity must be between 0 and 10.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/symptoms', 
        { symptom, severity }, 
        { headers: { 'x-auth-token': token } }
      );
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Symptom:</label>
        <input 
          type="text" 
          value={symptom} 
          onChange={(e) => setSymptom(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Severity (0-10):</label>
        <input 
          type="number" 
          value={severity} 
          onChange={(e) => setSeverity(e.target.value)} 
          min="0" 
          max="10" 
          required 
        />
        <small>Please enter a severity value between 0 (no symptoms) and 10 (most severe symptoms).</small>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Record Symptom</button>
    </form>
  );
};

export default SymptomForm;
