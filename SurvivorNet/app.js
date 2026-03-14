document.addEventListener('DOMContentLoaded', () => {
    // State management
    const state = {
        screen: 'splash',
        userName: '',
        userStatus: 'Safe',
        mapDownloaded: false,
    };

    // UI Elements
    const screens = {
        splash: document.getElementById('splash-screen'),
        setup: document.getElementById('setup-screen'),
        download: document.getElementById('download-screen'),
        dashboard: document.getElementById('dashboard-screen')
    };

    const startBtn = document.getElementById('start-btn');
    const setupNextBtn = document.getElementById('setup-next-btn');
    const downloadBtn = document.getElementById('download-btn');
    const statusBtns = document.querySelectorAll('.status-btn');
    const survivorNameInput = document.getElementById('survivor-name');
    const displayName = document.getElementById('display-name');
    const displayStatus = document.getElementById('display-status');

    // Navigation logic
    function switchScreen(screenName) {
        Object.keys(screens).forEach(key => {
            screens[key].classList.remove('active');
        });
        screens[screenName].classList.add('active');
        state.screen = screenName;

        // Initialize map if switching to dashboard
        if (screenName === 'dashboard' && !window.survivalMap) {
            initMap();
        }
    }

    // Event Listeners
    startBtn.addEventListener('click', () => {
        switchScreen('setup');
    });

    statusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            statusBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            state.userStatus = btn.dataset.status;
        });
    });

    setupNextBtn.addEventListener('click', () => {
        const name = survivorNameInput.value.trim();
        if (!name) {
            alert('Please enter a survivor name.');
            return;
        }
        state.userName = name;
        switchScreen('download');
    });

    downloadBtn.addEventListener('click', () => {
        const progressBar = document.getElementById('download-progress');
        let progress = 0;
        downloadBtn.disabled = true;
        downloadBtn.innerText = 'DOWNLOADING...';

        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                state.mapDownloaded = true;
                displayName.innerText = state.userName;
                displayStatus.innerText = state.userStatus;
                switchScreen('dashboard');
            }
        }, 100);
    });

    // SOS Alert
    document.getElementById('sos-btn').addEventListener('click', () => {
        const sosData = {
            user: state.userName,
            status: state.userStatus,
            location: window.survivalMap ? window.survivalMap.getCenter() : { lat: 0, lng: 0 }
        };
        alert(`SOS ALERT TRIGGERED!\nUser: ${sosData.user}\nStatus: ${sosData.status}\nCoordinates: ${sosData.location.lat.toFixed(2)}, ${sosData.location.lng.toFixed(2)}`);
    });

    // Resource Logic
    const resourceModal = document.getElementById('resource-modal');
    document.getElementById('add-resource-btn').addEventListener('click', () => {
        resourceModal.classList.remove('hidden');
    });

    document.getElementById('close-resource-btn').addEventListener('click', () => {
        resourceModal.classList.add('hidden');
    });

    document.querySelectorAll('.res-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            if (window.addResourceMarker) {
                window.addResourceMarker(type);
                resourceModal.classList.add('hidden');
            }
        });
    });
});
