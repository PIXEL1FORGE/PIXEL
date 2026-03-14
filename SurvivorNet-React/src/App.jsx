import React, { useState, useEffect } from 'react';
import Antigravity from './components/Antigravity';

import SplashScreen from './screens/SplashScreen';
import SetupScreen from './screens/SetupScreen';
import DownloadScreen from './screens/DownloadScreen';
import MapDashboard from './components/MapDashboard';
import AIEngine from './components/AIEngine';

const App = () => {
  const [screen, setScreen] = useState('splash');
  const [user, setUser] = useState({ name: '', status: 'Safe' });
  const [isScanning, setIsScanning] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const handleStart = () => setScreen('setup');
  const handleSetup = (userData) => {
    if (!userData.name) return alert('Please enter a name');
    setUser(userData);
    setScreen('download');
  };
  const handleDownloadComplete = () => setScreen('dashboard');

  const handleAIScan = () => {
    setIsScanning(true);
    setAiResult(null);
  };

  const handleAIFinish = () => {
    setIsScanning(false);
    const results = [
      {
        type: 'Safe Zone',
        coords: [40.718, -74.008],
        message: 'Low threat level. Water and medical supplies detected.'
      },
      {
        type: 'Resource Cluster',
        coords: [40.710, -73.998],
        message: 'Multiple supermarket and electronics stores found.'
      }
    ];
    setAiResult(results[Math.floor(Math.random() * results.length)]);
  };

  return (
    <div className="apocalyptic-theme">
      <div className="scanline-overlay"></div>
      {/* Antigravity Background */}
      <div className="antigravity-container">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#00ff00"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      {screen === 'splash' && <SplashScreen onStart={handleStart} />}
      {screen === 'setup' && <SetupScreen onNext={handleSetup} />}
      {screen === 'download' && <DownloadScreen onComplete={handleDownloadComplete} />}
      {screen === 'dashboard' && (
        <MapDashboard 
          user={user} 
          onScanIntel={handleAIScan} 
          aiResult={aiResult}
        />
      )}

      {isScanning && <AIEngine onFinish={handleAIFinish} />}
    </div>
  );
};


export default App;
