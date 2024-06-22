const settingsBtn = document.getElementById('settings-btn');
const settingsBtnNav = document.getElementById('settings-btn1');
const settingsModal = document.getElementById('settingsmodal');
const settings = document.getElementById('settings');
const settingsNav = document.getElementById('contpan');

settingsBtn.addEventListener('click', () => {
    if (settingsModal.style.display != "block") {
        settingsModal.style.display = "block";
    } else {
        settingsModal.style.display = "none";
    }
});

settingsBtnNav.addEventListener('click', () => {
    if (settingsModal.style.display != "block") {
        settingsModal.style.display = "block";
    } else {
        settingsModal.style.display = "none";
    }
});

settingsModal.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        settingsModal.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    window.electron.receive('platform-info', (platform) => {
        if (platform === 'win32') {
            document.getElementById('header').style.display = "";
            settingsModal.classList.add("fixed", "top-0", "mt-8", "left-0", "w-full", "h-full", "bg-gray-900", "bg-opacity-30", "z-50");
            settingsNav.classList.remove("hidden")
        } else {
            document.getElementById('header').style.display = "";
            settingsModal.classList.add("fixed", "top-0", "mt-8", "left-0", "w-full", "h-full", "bg-gray-900", "bg-opacity-30", "z-50");
            settingsNav.classList.remove("hidden")
        }
  });
});

/* Show Available Options */
document.getElementById('recorderDD').innerHTML = `
<option value="webrtc">WebRTC</option>
`
window.electron.receive('platform-info', (platform) => {
if (platform === 'win32') {
    document.getElementById('recorderDD').innerHTML = `
    <option value="webrtc">WebRTC</option>
    <option value="native">Native</option>
    `
}
});