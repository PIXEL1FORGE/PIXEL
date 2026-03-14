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

function triggerAIInference() {
    const modal = document.getElementById('ai-modal');
    const msgContainer = document.getElementById('ai-messages');
    const asciiContainer = document.getElementById('ascii-hourglass');
    
    modal.classList.remove('hidden');
    msgContainer.innerText = "";
    asciiContainer.innerText = "";

    let step = 0;
    const totalLines = HOURGLASS_ASCII.length;
    const intervalTime = 10000 / (totalLines + AI_MESSAGES.length);

    // Line by line animation
    const animate = () => {
        if (step < totalLines) {
            asciiContainer.innerText += HOURGLASS_ASCII[step] + "\n";
            step++;
            setTimeout(animate, intervalTime);
        } else if (step < totalLines + AI_MESSAGES.length) {
            msgContainer.innerText = AI_MESSAGES[step - totalLines];
            step++;
            setTimeout(animate, intervalTime);
        } else {
            // Animation finished
            modal.classList.add('hidden');
            generateAIResult();
        }
    };

    animate();
}

function generateAIResult() {
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

    const result = results[Math.floor(Math.random() * results.length)];
    const banner = document.getElementById('ai-alert-banner');
    const bannerText = document.getElementById('ai-alert-text');

    banner.classList.remove('hidden');
    bannerText.innerText = `NEW INTEL: ${result.type} Detected nearby.`;

    if (window.visualizeAIResult) {
        window.visualizeAIResult(result);
    }

    setTimeout(() => banner.classList.add('hidden'), 5000);
}

document.getElementById('scan-intel-btn').addEventListener('click', triggerAIInference);
