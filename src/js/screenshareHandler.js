async function toggleScreenModal() {
    document.getElementById('screenmodal').style.display = "flex";
    const sources = await window.electron.getSources();
    const screensContainer = document.getElementById('screensContainer');
    screensContainer.innerHTML = '';
    const windows = sources.filter(source => source.id.startsWith('window:'));
    const screens = sources.filter(source => source.id.startsWith('screen:'));

    screens.forEach(source => {
        const previewCard = document.createElement('div');
        previewCard.classList.add('preview-card');

        const img = document.createElement('img');
        img.src = source.thumbnail.toDataURL();

        const appLabel = document.createElement('p');
        appLabel.textContent = source.name;

        previewCard.appendChild(img);
        previewCard.appendChild(appLabel);
        screensContainer.appendChild(previewCard);
    });

    const windowsContainer = document.getElementById('windowsContainer');
    windowsContainer.innerHTML = '';
    windows.forEach(source => {
        const previewCard = document.createElement('div');
        previewCard.classList.add('preview-card');
        previewCard.onclick = () => showScreenPreview(source);
        const img = document.createElement('img');
        img.src = source.thumbnail.toDataURL();
        const appLabel = document.createElement('p');
        appLabel.textContent = source.name;
        previewCard.appendChild(img);
        previewCard.appendChild(appLabel);
        windowsContainer.appendChild(previewCard);
    });

    document.getElementById('screenmodal').onclick = function(event) {
        if (event.target === document.getElementById('screenmodal')) {
            closeScreenModal();
        }
    };

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeScreenModal();
        }
    });
}

function showScreenPreview(source) {
    document.getElementById('screenpicker').style.display = "none";
    document.getElementById('screenPreview').style.display = "block";
    window.electron.startFeed(source.id);
    const videoElement = document.querySelector('#screenPreview video');
    videoElement.srcObject = source.feed
}

function closeScreenModal() {
    document.getElementById('screenmodal').style.display = "none";
}