import React, { useState } from 'react';

const SetupScreen = ({ onNext }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Safe');

  return (
    <div className="screen setup-screen">
      <div className="content">
        <div className="header-box">
          <h2 className="terminal-text">IDENTIFICATION PROTOCOL</h2>
        </div>
        <div className="input-group">
          <label htmlFor="survivor-name">SURVIVOR NAME</label>
          <input 
            type="text" 
            id="survivor-name" 
            placeholder="[ENTER CODENAME]" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="terminal-input"
          />
        </div>
        <div className="input-group">
          <label>VITAL STATUS</label>
          <div className="status-options">
            {['Safe', 'Need Supplies', 'Injured', 'Need Rescue'].map(s => (
              <button 
                key={s}
                className={`status-btn ${status === s ? 'selected' : ''}`}
                onClick={() => setStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <button className="btn-primary" onClick={() => onNext({ name, status })}>INITIALIZE</button>
      </div>
    </div>
  );
};

export default SetupScreen;
