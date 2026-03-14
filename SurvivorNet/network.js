function simulateNetworkDiscovery() {
    console.log("Searching for nearby survivors via Bluetooth/WiFi Direct...");
    
    const nearby = [
        { id: 1, name: "Node_A7", type: "Beacon", signal: "Strong" },
        { id: 2, name: "Survivor_Relay_04", type: "Mesh Node", signal: "Weak" }
    ];

    return nearby;
}

document.getElementById('network-btn').addEventListener('click', () => {
    const nodes = simulateNetworkDiscovery();
    const nodeNames = nodes.map(n => n.name).join(", ");
    alert(`SURVIVOR NETWORK SCAN:\nNodes Detected: ${nodes.length}\nIDs: ${nodeNames}\n\nNearby survivors are being synced...`);
});

document.getElementById('danger-btn').addEventListener('click', () => {
    alert("COMMUNITY DANGER MAPPING:\nReporting restricted area at your current location.\nBroadcasting to nearby nodes...");
});
