document.addEventListener('DOMContentLoaded', () => {
  try {
    window.electron.receive('platform-info', (platform) => {
      if (platform === "win32") {
        document.getElementById('header').style.display = "";
        document.getElementById('contpan').remove();
      } else if (platform === "darmin") {
        document.getElementById('contpan').style.display = "";
        document.getElementById('header').remove();
      } else if (platform === "darwin") {
        document.getElementById('contpan').remove();
	      document.getElementById('header').remove();
      }
    });
  } catch {
    document.getElementById('contpan').style.display = "";
    document.getElementById('header').remove();
  }
});
