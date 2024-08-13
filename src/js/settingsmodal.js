const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settingsmodal');
const settings = document.getElementById('settings');

function toggleSettingsModal() {
    if (settingsModal.style.display != "flex") {
        settingsModal.style.display = "flex";
    } else {
        settingsModal.style.display = "none";
    }
}

settingsModal.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        settingsModal.style.display = "none";
    }
});