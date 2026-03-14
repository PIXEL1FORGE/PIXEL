import React from 'react';

const SplashScreen = ({ onStart }) => (
  <div className="screen splash-screen">
    <div className="content">
      <h1 className="glitch" data-text="SurvivorNet">SurvivorNet</h1>
      <p className="tagline">"When the world goes offline, survival shouldn’t."</p>
      <div className="terminal-loader">
        <span className="cursor">_</span>
      </div>
      <button className="btn-primary" onClick={onStart}>START SYSTEM</button>
    </div>
  </div>
);

export default SplashScreen;
