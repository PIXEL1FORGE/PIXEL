import React, { useState, useEffect } from 'react';

const DownloadScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Connecting to satellites...');

  useEffect(() => {
    const statusMessages = [
      'Connecting to satellites...',
      'Locating mesh nodes...',
      'Downloading topographical data...',
      'Fetching local resource logs...',
      'Syncing survivor pings...',
      'Finalizing offline map...'
    ];

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return 100;
        }
        const newProgress = prev + 2;
        setStatusText(statusMessages[Math.floor((newProgress / 100) * statusMessages.length)]);
        return newProgress;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="screen download-screen">
      <div className="content">
        <h2 className="terminal-text">PREPARING REGION</h2>
        <div className="map-selector-mock">
          <div className="region-info" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Sector: New York - 7G</span>
            <span>Est. Size: 142 MB</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="status-text-anim" style={{ 
              marginTop: '1rem', 
              fontSize: '0.8rem', 
              color: 'var(--accent)', 
              fontFamily: 'var(--font-mono)' 
          }}>
            {statusText}
          </div>
        </div>
        <button className="btn-primary" disabled>
            {progress < 100 ? `SYNCING ${progress}%` : 'SYNC COMPLETE'}
        </button>
      </div>
    </div>
  );
};

export default DownloadScreen;
