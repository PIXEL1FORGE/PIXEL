function initMap() {
    // Initial coordinates (somewhere urban)
    const initialCoords = [40.7128, -74.0060]; // New York
    
    const map = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView(initialCoords, 13);

    // Using a dark themed tile set (Mocking offline data)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    window.survivalMap = map;

    // Custom Icons
    const iconBase = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-';
    const icons = {
        User: new L.Icon({ iconUrl: iconBase + 'blue.png', iconSize: [25, 41], iconAnchor: [12, 41] }),
        Survivor: new L.Icon({ iconUrl: iconBase + 'gold.png', iconSize: [25, 41], iconAnchor: [12, 41] }),
        Danger: new L.Icon({ iconUrl: iconBase + 'red.png', iconSize: [25, 41], iconAnchor: [12, 41] }),
        Safe: new L.Icon({ iconUrl: iconBase + 'green.png', iconSize: [25, 41], iconAnchor: [12, 41] }),
        Resource: new L.Icon({ iconUrl: iconBase + 'violet.png', iconSize: [25, 41], iconAnchor: [12, 41] })
    };

    // User Marker
    L.marker(initialCoords, { icon: icons.User }).addTo(map).bindPopup('<b>YOU</b>').openPopup();

    // Mock Survivors
    const survivors = [
        { name: 'Alex', status: 'Safe', coords: [40.715, -74.000], time: '2m ago' },
        { name: 'Ravi', status: 'Needs Food', coords: [40.720, -74.010], time: '5m ago' },
        { name: 'Maya', status: 'Injured', coords: [40.710, -74.020], time: '1m ago' }
    ];

    survivors.forEach(s => {
        L.marker(s.coords, { icon: icons.Survivor })
         .addTo(map)
         .bindPopup(`<b>${s.name}</b><br>Status: ${s.status}<br>Updated: ${s.time}`);
    });

    // Mock Danger Zones
    L.circle([40.725, -74.005], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: 500
    }).addTo(map).bindPopup('<b>DANGER ZONE: Biohazard Detected</b>');

    // Add Resource Function
    window.addResourceMarker = function(type) {
        const center = map.getCenter();
        const offsetLat = (Math.random() - 0.5) * 0.01;
        const offsetLng = (Math.random() - 0.5) * 0.01;
        const pos = [center.lat + offsetLat, center.lng + offsetLng];

        L.marker(pos, { icon: icons.Resource })
         .addTo(map)
         .bindPopup(`<b>${type}</b><br>Added by you.`)
         .openPopup();
    };

    // AI Visualization Helper
    window.visualizeAIResult = function(result) {
        const markerIcon = result.type === 'Safe Zone' ? icons.Safe : icons.Danger;
        L.marker(result.coords, { icon: markerIcon })
         .addTo(map)
         .bindPopup(`<b>AI: ${result.type}</b><br>${result.message}`)
         .openPopup();
        
        map.flyTo(result.coords, 14);
    };
}
