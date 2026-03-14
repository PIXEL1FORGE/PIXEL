import React, { useState, useEffect } from 'react';

const AI_MESSAGES = [
  "Decrypting transmissions...",
  "Analyzing survivor signals...",
  "Running survival prediction model...",
  "Computing safe zone coordinates...",
  "Finalizing intelligence report..."
];

const HOURGLASS_ASCII = [
  "--------",
  "\\      /",
  " \\    / ",
  "  \\  /  ",
  "   ||   ",
  "  /  \\  ",
  " /    \\ ",
  "/      \\",
  "--------"
];

const AIEngine = ({ onFinish }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [asciiLines, setAsciiLines] = useState([]);
  const [metrics, setMetrics] = useState({ signal: 0, nodes: 0 });
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    let asciiStep = 0;
    let msgStep = 0;
    const totalSteps = HOURGLASS_ASCII.length + AI_MESSAGES.length;
    const intervalTime = 8000 / totalSteps;

    const timer = setInterval(() => {
      setMetrics({
        signal: Math.floor(Math.random() * 40) + 60,
        nodes: Math.floor(Math.random() * 5) + 1
      });

      if (asciiStep < HOURGLASS_ASCII.length) {
        setAsciiLines(prev => [...prev, HOURGLASS_ASCII[asciiStep]]);
        asciiStep++;
      } else if (msgStep < AI_MESSAGES.length) {
        setMsgIndex(msgStep);
        msgStep++;
      } else {
        clearInterval(timer);
        setIsFinishing(true);
        setTimeout(() => onFinish(), 800);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="modal">
      <div className="modal-content glass-panel" style={{ border: '1px solid var(--accent)', padding: '3rem' }}>
        <div className="radar-container">
            <div className="radar-sweep"></div>
            <div className="radar-circle"></div>
            <div className="radar-circle" style={{ width: '60%', height: '60%' }}></div>
            <div className="radar-circle" style={{ width: '30%', height: '30%' }}></div>
        </div>

        <div id="ai-messages" className="terminal-text" style={{ minHeight: '3em', marginBottom: '1rem' }}>
          {AI_MESSAGES[msgIndex]}
        </div>

        <div className="metrics-box" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '1rem', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
            <div className="metric">SIGNAL: <span className="accent-text">{metrics.signal}%</span></div>
            <div className="metric">NODES: <span className="accent-text">{metrics.nodes}</span></div>
        </div>

        <pre id="ascii-hourglass" style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.5rem', 
          lineHeight: '1', 
          color: 'var(--text-muted)', 
          whiteSpace: 'pre',
          textAlign: 'center',
          opacity: 0.5
        }}>
          {asciiLines.join('\n')}
        </pre>
      </div>
    </div>
  );
};

export default AIEngine;
