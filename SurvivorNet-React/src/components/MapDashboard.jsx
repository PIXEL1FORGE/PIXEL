import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
const iconBase = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-';
const icons = {
    User: new L.Icon({ iconUrl: iconBase + 'blue.png', iconSize: [25, 41], iconAnchor: [12, 41] }),
    Survivor: new L.Icon({ iconUrl: iconBase + 'gold.png', iconSize: [25, 41], iconAnchor: [12, 41] }),
    Danger: new L.Icon({ iconUrl: iconBase + 'red.png', iconSize: [25, 41], iconAnchor: [12, 41] }),
    Safe: new L.Icon({ iconUrl: iconBase + 'green.png', iconSize: [25, 41], iconAnchor: [12, 41] }),
    Resource: new L.Icon({ iconUrl: iconBase + 'violet.png', iconSize: [25, 41], iconAnchor: [12, 41] })
};

const MapUpdater = ({ center }) => {
    const map = useMap();
    if (center) map.flyTo(center, 14);
    return null;
};

const MapDashboard = ({ user, onScanIntel, aiResult }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, text: 'Satellite link established.', type: 'info' },
    { id: 2, text: 'Mesh network active in S7G.', type: 'info' }
  ]);
  const [inventory, setInventory] = useState([
    { icon: '🔋', value: '85%' },
    { icon: '💧', value: '2L' },
    { icon: '💊', value: '3x' }
  ]);
  const [resources, setResources] = useState([]);
  const [hazards, setHazards] = useState([]);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  const initialCoords = [40.7128, -74.0060];

  const survivors = [
    { name: 'Alex', status: 'Safe', coords: [40.715, -74.000], time: '2m ago', health: 95 },
    { name: 'Ravi', status: 'Needs Food', coords: [40.720, -74.010], time: '5m ago', health: 70 },
    { name: 'Maya', status: 'Injured', coords: [40.710, -74.020], time: '1m ago', health: 45 }
  ];

  const handleMeshScan = () => {
    const newLog = { id: Date.now(), text: 'Searching for nearby survivors...', type: 'scan' };
    setLogs(prev => [newLog, ...prev]);
    
    setTimeout(() => {
        const found = [
            { id: Date.now() + 1, text: 'Node Detected: Relay_04 (Weak)', type: 'discovery' },
            { id: Date.now() + 2, text: 'Node Detected: Beacon_A7 (Strong)', type: 'discovery' }
        ];
        setLogs(prev => [...found, ...prev]);
        alert(`SURVIVOR NETWORK SCAN:\nNodes Detected: 2\nNearby survivors are being synced...`);
    }, 1500);
  };

  const handleMarkHazard = () => {
    const center = initialCoords; // Mocking current location
    const newHazard = {
        id: Date.now(),
        center,
        radius: 300
    };
    setHazards(prev => [...prev, newHazard]);
    setLogs(prev => [{ id: Date.now(), text: 'BROADCASTING HAZARD AREA...', type: 'danger' }, ...prev]);
    alert("COMMUNITY DANGER MAPPING:\nReporting restricted area at your current location.\nBroadcasting to nearby nodes...");
  };

  const addResource = (type) => {
    const offsetLat = (Math.random() - 0.5) * 0.01;
    const offsetLng = (Math.random() - 0.5) * 0.01;
    const newRes = {
        type,
        coords: [initialCoords[0] + offsetLat, initialCoords[1] + offsetLng],
        id: Date.now()
    };
    setResources([...resources, newRes]);
    setIsResourceModalOpen(false);
    setLogs(prev => [{ id: Date.now(), text: `Marked ${type} on map.`, type: 'info' }, ...prev]);
  };

  const handleSOS = () => {
    setSosActive(true);
    setLogs(prev => [{ id: Date.now(), text: 'BROADCASTING SOS...', type: 'danger' }, ...prev]);
    setTimeout(() => {
        alert(`BROADCASTING SOS!\nUser: ${user.name}\nStatus: ${user.status}\nLocation: ${initialCoords[0]}, ${initialCoords[1]}`);
        setSosActive(false);
    }, 2000);
  };

  useEffect(() => {
    if (aiResult) {
        setLogs(prev => [{ id: Date.now(), text: `NEW INTEL: ${aiResult.type} located.`, type: 'highlight' }, ...prev]);
    }
  }, [aiResult]);

  return (
    <div className={`map-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <MapContainer 
        center={initialCoords} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapUpdater center={aiResult?.coords} />

        {/* User Marker */}
        <Marker position={initialCoords} icon={icons.User}>
          <Popup className="apocalyptic-popup">
            <div className="popup-header">YOU</div>
            <div className="popup-body">Status: {user.status}</div>
          </Popup>
        </Marker>

        {/* Survivor Markers */}
        {survivors.map(s => (
          <Marker key={s.name} position={s.coords} icon={icons.Survivor}>
             <Popup className="apocalyptic-popup">
                <div className="popup-header">{s.name}</div>
                <div className="popup-body">
                    Status: {s.status}<br/>
                    Health: {s.health}%<br/>
                    <small>Updated: {s.time}</small>
                </div>
             </Popup>
          </Marker>
        ))}

        {/* Custom Resources */}
        {resources.map(r => (
            <Marker key={r.id} position={r.coords} icon={icons.Resource}>
                <Popup className="apocalyptic-popup">
                    <div className="popup-header">{r.type}</div>
                    <div className="popup-body">Personal Cache</div>
                </Popup>
            </Marker>
        ))}

        {/* AI Result Marker */}
        {aiResult && (
            <Marker position={aiResult.coords} icon={aiResult.type === 'Safe Zone' ? icons.Safe : icons.Danger}>
                <Popup className="apocalyptic-popup">
                    <div className="popup-header">AI INTEL: {aiResult.type}</div>
                    <div className="popup-body">{aiResult.message}</div>
                </Popup>
            </Marker>
        )}

        {/* Danger Zone (Initial) */}
        <Circle center={[40.725, -74.005]} radius={500} pathOptions={{ color: 'red', fillColor: '#f03', fillOpacity: 0.3 }}>
            <Popup className="apocalyptic-popup">
                <div className="popup-header">BIOHAZARD AREA</div>
                <div className="popup-body">Threat Level: CRITICAL</div>
            </Popup>
        </Circle>

        {/* Dynamic Hazards */}
        {hazards.map(h => (
            <Circle key={h.id} center={h.center} radius={h.radius} pathOptions={{ color: 'orange', fillColor: '#ffcc00', fillOpacity: 0.4 }}>
                <Popup className="apocalyptic-popup">
                    <div className="popup-header">RESTRICTED AREA</div>
                    <div className="popup-body">Reported by you.</div>
                </Popup>
            </Circle>
        ))}
      </MapContainer>

      {/* Sidebar */}
      <div className={`intel-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? '→' : '←'}
        </button>
        <div className="sidebar-content">
            <h3 className="terminal-text">INTEL LOGS</h3>
            <div className="log-list">
                {logs.map(log => (
                    <div key={log.id} className={`log-item ${log.type === 'highlight' ? 'highlight' : ''} ${log.type === 'danger' ? 'danger' : ''}`}>
                        {log.text}
                    </div>
                ))}
            </div>
            
            <h3 className="terminal-text" style={{ marginTop: '2rem' }}>INVENTORY</h3>
            <div className="inventory-grid">
                {inventory.map((item, idx) => (
                    <div key={idx} className="inv-slot">{item.icon} {item.value}</div>
                ))}
                <div className="inv-slot" style={{ opacity: 0.3 }}>[EMPTY]</div>
            </div>
        </div>
      </div>

      {/* UI Overlays */}
      <div className="top-bar">
        <div className="user-status-badge glass-panel">
          <span className="accent-text">{user.name.toUpperCase()}</span> | {user.status.toUpperCase()}
        </div>
      </div>

      <div className="side-controls">
        <button onClick={() => setIsResourceModalOpen(true)} className="icon-btn" title="Add Resource">✚</button>
        <button onClick={handleMeshScan} className="icon-btn" title="Mesh Scan">📟</button>
        <button onClick={handleMarkHazard} className="icon-btn" title="Mark Hazard">⚠</button>
        <button onClick={onScanIntel} className="btn-accent scan-btn" style={{ marginTop: '10px' }}>
            SCAN INTEL
        </button>
      </div>

      <button onClick={handleSOS} className={`sos-btn ${sosActive ? 'active' : ''}`}>
        {sosActive ? 'BROADCASTING...' : 'SOS ALERT'}
      </button>

      {/* Resource Modal */}
      {isResourceModalOpen && (
        <div className="modal">
          <div className="modal-content glass-panel">
            <h3 className="terminal-text">SELECT RESOURCE TYPE</h3>
            <div className="resource-grid">
              {['Hospital', 'Supermarket', 'Electronics', 'Water', 'Shelter', 'Fuel'].map(type => (
                <button key={type} className="res-type-btn" onClick={() => addResource(type)}>
                   {type}
                </button>
              ))}
            </div>
            <button className="btn-secondary" onClick={() => setIsResourceModalOpen(false)}>CANCEL</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapDashboard;
