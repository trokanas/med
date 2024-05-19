import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [advice, setAdvice] = useState('');
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const symptomResult = await axios.get('http://localhost:5000/api/symptoms', {
          headers: { 'x-auth-token': token },
        });
        setSymptoms(symptomResult.data);

        const symptomDescriptions = symptomResult.data.map(s => s.symptom).join(', ');

        const headers = { 'x-auth-token': token };
        
        const adviceResult = await axios.post('http://localhost:5000/api/advice', 
          { symptoms: symptomDescriptions }, 
          { headers }
        );

        if (adviceResult.data && adviceResult.data.advice) {
          setAdvice(adviceResult.data.advice);
        } else {
          setError('No advice received');
        }

        const logResult = await axios.get('http://localhost:5000/api/dailyLogs', {
          headers: { 'x-auth-token': token }
        });
        setLogs(logResult.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data. Please try again later.');
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/symptoms/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setSymptoms(symptoms.filter(symptom => symptom._id !== id));
    } catch (err) {
      console.error(`Error deleting symptom with ID: ${id}`, err);
    }
  };

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(advice);
      speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  };

  const handleStopTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <Link to="/record-symptom">
        <button className="landing-button">Record Symptom</button>
      </Link>
      <ul>
        {symptoms.map(symptom => (
          <li key={symptom._id}>
            <span>{symptom.symptom} - {symptom.severity}</span>
            <button onClick={() => handleDelete(symptom._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Advice</h2>
      {error && <p className="error-message">{error}</p>}
      <p className="advice">{advice}</p>
      <button onClick={handleTextToSpeech} disabled={!advice}>Listen to Advice</button>
      <button onClick={handleStopTextToSpeech}>Stop Listening</button>
      <h2>Daily Logs</h2>
      <Link to="/daily-log">
        <button className="landing-button">Add Daily Log</button>
      </Link>
      <ul>
        {logs.map(log => (
          <li key={log._id}>
            <p>{log.content}</p>
            <small>{new Date(log.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
