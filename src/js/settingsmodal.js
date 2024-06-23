const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settingsmodal');
const settings = document.getElementById('settings');
const settingsNav = document.getElementById('contpan');

function toggleSettingsModal() {
    if (settingsModal.style.display != "block") {
        settingsModal.style.display = "block";
    } else {
        settingsModal.style.display = "none";
    }
}

settingsModal.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        settingsModal.style.display = "none";
    }
});