import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DailyLogForm = () => {
  const [content, setContent] = useState('');
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/dailyLogs', {
          headers: { 'x-auth-token': token }
        });
        setLogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/dailyLogs', 
        { content }, 
        { headers: { 'x-auth-token': token } }
      );
      setLogs([res.data, ...logs]);
      setContent('');
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Daily Logger</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Daily Thoughts and Experiences:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Log Entry</button>
      </form>
      <button onClick={() => navigate('/dashboard')}>Go Back</button> {/* Add Go Back button */}
      <h3>Previous Entries</h3>
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

export default DailyLogForm;
