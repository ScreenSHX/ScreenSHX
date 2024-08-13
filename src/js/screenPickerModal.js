const shareBtn = document.getElementById('screentest');
const screenPickerModal = document.getElementById('screenpicker');
const screenPicker = document.getElementById('screenpicker');

function toggleScreenModal() {
    if (screenPickerModal.style.display != "flex") {
        screenPickerModal.style.display = "flex";
    } else {
        screenPickerModal.style.display = "none";
    }
}

screenPickerModal.addEventListener('click', (event) => {
    if (event.target === screenPickerModal) {
        screenPickerModal.style.display = "none";
    }
});