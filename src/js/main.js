document.addEventListener('DOMContentLoaded', () => {
  try {
    window.electron.receive('platform-info', (platform) => {
      if (platform === "win32") {
        document.getElementById('header').style.display = "";
        document.getElementById('contpan').style.display = "none";
      } else if (platform === "darmin") {
        document.getElementById('contpan').style.display = "";
        document.getElementById('header').style.display = "none";
      } else if (platform === "darmin") {
        document.getElementById('contpan').style.display = "";
        document.getElementById('header').style.display = "none";
      }
    });
  } catch {
    document.getElementById('contpan').style.display = "";
    document.getElementById('header').style.display = "none";
  }
});