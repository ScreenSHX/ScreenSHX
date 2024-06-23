const header = document.getElementById('header');

try {
  window.electron.receive('platform-info', (platform) => {
    if (platform === "win32") {
      header.innerHTML = `
        <div id="left-header" class="flex items-center">
            <img src="./screenshx.png" id="favicon" class="ml-2 w-5 h-5 rounded">
            <h1 class="text-white text-sm font-medium ml-2">ScreenSHX</h1>
        </div>
        <div id="right-header" class="flex items-center">
            <button id="settings-btn" class="bg-transparent border-none text-white text-sm cursor-pointer no-drag w-11 h-8 hover:bg-gray-800 transition duration-300"><i class="fa fa-cog"></i></button>
            <button id="minimize-btn" onclick="window.electron.windowControls('minimize')" class="bg-transparent border-none text-white text-sm cursor-pointer no-drag w-11 h-8 hover:bg-gray-800 transition duration-300">-</button>
            <button id="maximize-btn" onclick="window.electron.windowControls('maximize')" class="bg-transparent border-none text-white text-sm cursor-pointer no-drag w-11 h-8 hover:bg-gray-800 transition duration-300">□</button>
            <button id="close-btn" onclick="window.electron.windowControls('close')" class="bg-transparent border-none text-white text-sm cursor-pointer no-drag w-11 h-8 hover:bg-red-600 transition duration-300">×</button>
        </div>`;
    } else if (platform === "darwin") {
      header.innerHTML = `
      <div id="left-header" class="flex items-center"></div>
      <div id="right-header" class="flex items-center">
        <button id="settings-btn" class="bg-transparent border-none text-white text-sm cursor-pointer no-drag w-11 h-8 hover:bg-gray-800 transition duration-300"><i class="fa fa-cog"></i></button>
      </div>`;
    } else if (platform === "linux") {
      header.remove();
    }
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        toggleSettingsModal();
      });
    }
  });

  window.electron.receive('fullscreen-status', (isFullscreen) => {
    if (isFullscreen) {
      //header.innerHTML = "";
    } else {
      //header.style.contentVisibility = 'visible';
    }
  });


} catch (err) {
  header.remove();
  setTimeout(error, 500);
  function error() {
    if (err.toString().includes("window.electron")) {
      alert("You are using a web browser by the looks of it... Your browser does not support window.electron.");
    }
  }
}
